"use server";
import { gemini } from '@/lib/gemini';



interface FormData {
  skill: string;
  location: string;
  timeAvailability: string;
  investment: string;
  experience: string;
}

interface IdeaResult {
  id: string;
  title: string;
  description: string;
  monthlyIncome: string;
  investment: string;
  demand: string;
  competition: string;
  steps: string[];
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  timeToProfit: string;
}

export async function generateBusinessIdeas(
  formData: FormData
): Promise<{ success: boolean; ideas?: IdeaResult[]; error?: string }> {
  try {
    const prompt = `You are an expert business consultant for women entrepreneurs in India. Generate 3 highly personalized and practical business ideas based on the following profile:

**Profile Details:**
- Primary Skill/Interest: ${formData.skill}
- Location: ${formData.location}
- Time Availability: ${formData.timeAvailability}
- Investment Capacity: ${formData.investment}
- Business Experience: ${formData.experience}

**Requirements:**
1. Generate exactly 3 business ideas tailored to this profile
2. Consider local market conditions in ${formData.location}
3. Match investment range to ${formData.investment}
4. Align time commitment with ${formData.timeAvailability}
5. Adjust complexity based on ${formData.experience} experience level

**For each business idea, provide:**
- title: Catchy, specific business name (e.g., "Home-Based Bakery & Cake Delivery")
- description: 2-3 sentence practical description
- monthlyIncome: Realistic range in Indian Rupees (e.g., "₹25,000 - ₹45,000")
- investment: Initial investment needed in INR (e.g., "₹15,000 - ₹30,000")
- demand: Market demand with percentage (e.g., "High (92% demand score)")
- competition: Low/Medium/High with brief context
- steps: Array of 6 actionable steps to launch (be specific, include Indian licenses/permits)
- tags: Array of 3 relevant tags (e.g., ["Food", "Home-Based", "Creative"])
- difficulty: "Easy" or "Medium" or "Hard" based on experience needed
- timeToProfit: Realistic timeline (e.g., "2-3 months")

**Important Guidelines:**
- Focus on businesses suitable for women entrepreneurs
- Include home-based options when possible
- Mention relevant Indian regulations (FSSAI, GST, etc.)
- Consider local market trends in ${formData.location}
- Prioritize low-risk, scalable ideas
- Include both online and offline options
- Be realistic with income projections

Return ONLY a valid JSON array of 3 business ideas. No markdown, no explanations.

Example format:
[
  {
    "title": "...",
    "description": "...",
    "monthlyIncome": "...",
    "investment": "...",
    "demand": "...",
    "competition": "...",
    "steps": ["...", "...", "...", "...", "...", "..."],
    "tags": ["...", "...", "..."],
    "difficulty": "Easy",
    "timeToProfit": "..."
  }
]`;

    // Generate ideas using Gemini
    const response = await gemini.generateJSON(prompt);

    // Validate and format response
    if (!Array.isArray(response) || response.length === 0) {
      throw new Error("Invalid response format from AI");
    }

    // Add IDs and ensure proper typing
    const ideas: IdeaResult[] = response.slice(0, 3).map((idea, index) => ({
      id: `${Date.now()}-${index}`,
      title: idea.title || "Untitled Business",
      description: idea.description || "No description available",
      monthlyIncome: idea.monthlyIncome || "₹15,000 - ₹30,000",
      investment: idea.investment || "₹10,000 - ₹20,000",
      demand: idea.demand || "Medium (70% demand score)",
      competition: idea.competition || "Medium",
      steps: Array.isArray(idea.steps) ? idea.steps : [],
      tags: Array.isArray(idea.tags) ? idea.tags : ["Business"],
      difficulty:
        idea.difficulty === "Easy" ||
        idea.difficulty === "Medium" ||
        idea.difficulty === "Hard"
          ? idea.difficulty
          : "Medium",
      timeToProfit: idea.timeToProfit || "3-6 months",
    }));

    return { success: true, ideas };
  } catch (error) {
    console.error("Error generating business ideas:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate business ideas. Please try again.",
    };
  }
}