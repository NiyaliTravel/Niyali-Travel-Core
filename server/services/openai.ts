import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function analyzeSentiment(text: string): Promise<{
  rating: number,
  confidence: number
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment analysis expert for travel reviews. Analyze the sentiment of the text and provide a rating from 1 to 5 stars and a confidence score between 0 and 1. Respond with JSON in this format: { 'rating': number, 'confidence': number }",
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    if (response.choices[0].message.content === null) {
      throw new Error("OpenAI response content is null.");
    }
    const result = JSON.parse(response.choices[0].message.content);

    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating))),
      confidence: Math.max(0, Math.min(1, result.confidence)),
    };
  } catch (error) {
    throw new Error("Failed to analyze sentiment: " + error.message);
  }
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `You are Niyali AI, a helpful travel assistant for Niyali Travel, specializing in Maldivian guest house experiences. You help travelers:
    - Find the perfect guest house based on their preferences
    - Provide information about Maldivian culture and experiences
    - Assist with booking questions and ferry schedules
    - Recommend experiences like freediving, cultural tours, and island hopping
    
    Always be friendly, knowledgeable about the Maldives, and focus on authentic local experiences. Keep responses concise but helpful.
    ${context ? `\n\nContext: ${context}` : ''}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500,
    });

    if (response.choices[0].message.content === null) {
      throw new Error("OpenAI response content is null.");
    }
    return response.choices[0].message.content;
  } catch (error) {
    throw new Error("Failed to generate chat response: " + error.message);
  }
}

export async function generateTravelRecommendations(userPreferences: {
  budget?: string;
  interests?: string[];
  duration?: string;
  groupSize?: number;
}): Promise<{
  guestHouses: string[];
  experiences: string[];
  itinerary: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Maldivian travel expert. Based on user preferences, recommend guest houses, experiences, and create a brief itinerary. Respond with JSON in this format: { 'guestHouses': [string array], 'experiences': [string array], 'itinerary': string }",
        },
        {
          role: "user",
          content: `Generate travel recommendations for: Budget: ${userPreferences.budget || 'flexible'}, Interests: ${userPreferences.interests?.join(', ') || 'general travel'}, Duration: ${userPreferences.duration || 'flexible'}, Group size: ${userPreferences.groupSize || 2}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    if (response.choices[0].message.content === null) {
      throw new Error("OpenAI response content is null.");
    }
    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    throw new Error("Failed to generate travel recommendations: " + (error as Error).message);
  }
}
