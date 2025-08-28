import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { ObjectUploader } from "@/components/ObjectUploader";

export default function AdminContent() {
  const queryClient = useQueryClient();
  const [contentSections, setContentSections] = useState<any[]>([]);
  const [editingSection, setEditingSection] = useState<any | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['/api/content'],
    queryFn: () => fetch('/api/content').then(res => res.json()),
  });

  useEffect(() => {
    if (data) {
      setContentSections(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (updatedSection: any) => {
      const url = editingSection?.id ? `/api/content/${editingSection.id}` : '/api/content';
      const method = editingSection?.id ? 'PUT' : 'POST';
      return fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSection),
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      setEditingSection(null);
    },
  });

  const handleEdit = (section: any) => {
    setEditingSection({ ...section });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingSection) {
      setEditingSection({ ...editingSection, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = (url: string) => {
    if (editingSection) {
      setEditingSection({ ...editingSection, imageUrl: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSection) {
      mutation.mutate(editingSection);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-niyali-teal" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-niyali-navy mb-6">Manage Website Content</h1>
        <div className="space-y-8">
          {contentSections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{section.content}</p>
                {section.imageUrl && <img src={section.imageUrl} alt={section.title} className="w-full h-auto rounded-md" />}
                <Button onClick={() => handleEdit(section)} className="mt-4">Edit</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {editingSection && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-niyali-navy mb-4">{editingSection.id ? "Edit Section" : "New Section"}</h2>
            <form onSubmit={handleSubmit}>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={editingSection.title} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" name="content" value={editingSection.content} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image</Label>
                    <ObjectUploader onComplete={(result) => {
                      if (result.successful && result.successful.length > 0 && result.successful[0].uploadURL) {
                        handleImageUpload(result.successful[0].uploadURL);
                      }
                    }} onGetUploadParameters={async () => {
                      const response = await fetch("/api/objects/upload");
                      const { uploadURL } = await response.json();
                      return {
                        method: "PUT",
                        url: uploadURL,
                      };
                    }}>
                      Upload Image
                    </ObjectUploader>
                    {editingSection.imageUrl && <img src={editingSection.imageUrl} alt="Preview" className="mt-4 w-full h-auto rounded-md" />}
                  </div>
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditingSection(null)} className="ml-2">
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}