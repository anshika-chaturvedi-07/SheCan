"use server";

import { gemini } from "@/lib/gemini";

interface DesignRequest {
  designType: string;
  businessName: string;
  colorScheme: string;
  description: string;
}

interface GeneratedDesign {
  id: string;
  type: string;
  prompt: string;
  imageUrl: string;
  downloadUrl: string;
  aiGenerated: boolean;
}

export async function generateDesign(request: DesignRequest) {
  try {
    // Generate enhanced design prompt using Gemini
    const prompt = `You are a professional graphic designer. Create a detailed design description for:

Design Type: ${request.designType}
Business Name: ${request.businessName}
Color Scheme: ${request.colorScheme}
Description: ${request.description}

Provide a JSON response with:
{
  "enhancedPrompt": "A detailed, visual description for image generation (100-150 words)",
  "designElements": ["element1", "element2", "element3"],
  "colorPalette": ["#hex1", "#hex2", "#hex3"],
  "typography": "font style recommendation",
  "layout": "layout description"
}

Make it specific, visual, and creative for a women entrepreneur in India.`;

    const result = await gemini.generateJSON(prompt);

    // In a real implementation, you would send result.enhancedPrompt to:
    // - DALL-E API
    // - Stable Diffusion
    // - Midjourney API
    // For now, we'll use a placeholder service

    const imageUrl = generatePlaceholderImage(request);

    return {
      success: true,
      design: {
        id: `design-${Date.now()}`,
        type: request.designType,
        prompt: result.enhancedPrompt || request.description,
        imageUrl: imageUrl,
        downloadUrl: imageUrl,
        aiGenerated: true,
        designElements: result.designElements || [],
        colorPalette: result.colorPalette || [],
        typography: result.typography || "Modern Sans-serif",
        layout: result.layout || "Centered composition",
      } as GeneratedDesign & { designElements: string[]; colorPalette: string[]; typography: string; layout: string },
    };
  } catch (error) {
    console.error("Design generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate design",
    };
  }
}

// Helper function to generate styled placeholder images
function generatePlaceholderImage(request: DesignRequest): string {
  const encodedName = encodeURIComponent(request.businessName);
  const encodedType = encodeURIComponent(request.designType.replace("-", " "));
  
  // Color scheme to hex mapping
  const colorMap: Record<string, string> = {
    vibrant: "FF6B6B",
    pastel: "FFD6E8",
    elegant: "2C3E50",
    earthy: "8B7355",
    modern: "6366F1",
  };

  const bgColor = colorMap[request.colorScheme] || "6366F1";
  
  return `https://placehold.co/1200x800/${bgColor}/ffffff?text=${encodedName}+%0A${encodedType}&font=raleway`;
}