import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/Utills/queryClient";
import { Edit, Save, Plus, Trash2, Settings, Navigation, FileText, Upload, Image } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";
import { ObjectUploader } from "@/components/ObjectUploader";

export default function AdminDashboard() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sectionKey: "",
    title: "",
    subtitle: "",
    content: "",
    imageUrl: ""
  });
  const [navFormData, setNavFormData] = useState({
    title: "",
    href: "",
    order: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Content sections queries
  const { data: contentSections, isLoading: isLoadingContent } = useQuery({
    queryKey: ['/api/content'],
  });

  const { data: navigationItems, isLoading: isLoadingNav } = useQuery({
    queryKey: ['/api/navigation'],
  });

  // Content mutations
  const createContentMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/content', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({ title: "Success", description: "Content section created successfully" });
      setFormData({ sectionKey: "", title: "", subtitle: "", content: "", imageUrl: "" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create content section", variant: "destructive" });
    }
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await apiRequest('PUT', `/api/content/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({ title: "Success", description: "Content section updated successfully" });
      setEditingSection(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update content section", variant: "destructive" });
    }
  });

  // Navigation mutations
  const createNavMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/navigation', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/navigation'] });
      toast({ title: "Success", description: "Navigation item created successfully" });
      setNavFormData({ title: "", href: "", order: 0 });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create navigation item", variant: "destructive" });
    }
  });

  const deleteNavMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/navigation/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/navigation'] });
      toast({ title: "Success", description: "Navigation item deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete navigation item", variant: "destructive" });
    }
  });

  const handleEditSection = (section: any) => {
    setEditingSection(section.id);
    setFormData({
      sectionKey: section.sectionKey,
      title: section.title || "",
      subtitle: section.subtitle || "",
      content: section.content || "",
      imageUrl: section.imageUrl || ""
    });
  };

  const handleSaveSection = () => {
    if (editingSection) {
      updateContentMutation.mutate({
        id: editingSection,
        data: formData
      });
    } else {
      createContentMutation.mutate(formData);
    }
  };

  const handleCreateNav = () => {
    createNavMutation.mutate(navFormData);
  };

  const handleDeleteNav = (id: string) => {
    deleteNavMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-niyali-navy mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage website content and navigation</p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Create New Content Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create New Content Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sectionKey">Section Key</Label>
                    <Input
                      id="sectionKey"
                      value={formData.sectionKey}
                      onChange={(e) => setFormData(prev => ({ ...prev, sectionKey: e.target.value }))}
                      placeholder="hero, about, features, etc."
                      data-testid="input-section-key"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Section title"
                      data-testid="input-title"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Section subtitle"
                    data-testid="input-subtitle"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Section content"
                    rows={4}
                    data-testid="textarea-content"
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://example.com/image.jpg or /objects/..."
                      data-testid="input-image-url"
                      className="flex-1"
                    />
                    <ObjectUploader
                      maxNumberOfFiles={1}
                      maxFileSize={10485760}
                      onGetUploadParameters={async () => {
                        const response = await fetch('/api/objects/upload', {
                          method: 'POST',
                          headers: {
                            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                          }
                        });
                        const data = await response.json();
                        return {
                          method: 'PUT' as const,
                          url: data.uploadURL
                        };
                      }}
                      onComplete={async (result) => {
                        if (result.successful && result.successful[0]) {
                          const uploadURL = result.successful[0].uploadURL;
                          const response = await fetch('/api/content-images', {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                            },
                            body: JSON.stringify({ imageURL: uploadURL })
                          });
                          const data = await response.json();
                          setFormData(prev => ({ ...prev, imageUrl: data.publicURL }));
                          toast({ title: "Success", description: "Image uploaded successfully" });
                        }
                      }}
                      buttonClassName="bg-niyali-gradient text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </ObjectUploader>
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleSaveSection}
                  disabled={createContentMutation.isPending || updateContentMutation.isPending}
                  className="bg-niyali-gradient text-white"
                  data-testid="button-save-content"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingSection ? 'Update Section' : 'Create Section'}
                </Button>
                {editingSection && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setEditingSection(null);
                      setFormData({ sectionKey: "", title: "", subtitle: "", content: "", imageUrl: "" });
                    }}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Existing Content Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Existing Content Sections
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingContent ? (
                  <div className="text-center py-8">Loading content sections...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(contentSections as any[] || []).map((section: any) => (
                      <Card key={section.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{section.sectionKey}</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditSection(section)}
                              data-testid={`button-edit-${section.sectionKey}`}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{section.title}</h3>
                          <p className="text-xs text-gray-600 mb-2">{section.subtitle}</p>
                          <p className="text-xs text-gray-500 line-clamp-3">{section.content}</p>
                          {section.imageUrl && (
                            <img
                              src={section.imageUrl}
                              alt={section.title}
                              className="w-full h-20 object-cover rounded mt-2"
                            />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            {/* Create Navigation Item */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Navigation Item
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="navTitle">Title</Label>
                    <Input
                      id="navTitle"
                      value={navFormData.title}
                      onChange={(e) => setNavFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Menu item title"
                      data-testid="input-nav-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="navHref">Link</Label>
                    <Input
                      id="navHref"
                      value={navFormData.href}
                      onChange={(e) => setNavFormData(prev => ({ ...prev, href: e.target.value }))}
                      placeholder="/page-url"
                      data-testid="input-nav-href"
                    />
                  </div>
                  <div>
                    <Label htmlFor="navOrder">Order</Label>
                    <Input
                      id="navOrder"
                      type="number"
                      value={navFormData.order}
                      onChange={(e) => setNavFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      data-testid="input-nav-order"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCreateNav}
                  disabled={createNavMutation.isPending}
                  className="bg-niyali-gradient text-white"
                  data-testid="button-create-nav"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Navigation Item
                </Button>
              </CardContent>
            </Card>

            {/* Navigation Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation Items</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingNav ? (
                  <div className="text-center py-8">Loading navigation items...</div>
                ) : (
                  <div className="space-y-3">
                    {(navigationItems as any[] || []).map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{item.order}</Badge>
                          <div>
                            <span className="font-medium">{item.title}</span>
                            <span className="text-sm text-gray-500 ml-2">{item.href}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteNav(item.id)}
                          data-testid={`button-delete-nav-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}