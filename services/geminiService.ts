
import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { TextContent, GeneratedContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-2.5-pro';
const imageModel = 'gemini-2.5-flash-image';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    matchPercentage: { type: Type.INTEGER, description: "Porcentaje de compatibilidad (0-100)" },
    justification: { type: Type.STRING, description: "Justificación del porcentaje de compatibilidad" },
    linkedin_long: { type: Type.STRING, description: "Publicación larga para LinkedIn" },
    linkedin_ats: { type: Type.STRING, description: "Resumen optimizado para ATS para LinkedIn" },
    copilot_long: { type: Type.STRING, description: "Publicación larga y contundente para una plataforma profesional" },
    copilot_ats: { type: Type.STRING, description: "Resumen optimizado para ATS para una plataforma profesional" },
    linkedin_image_prompt: { type: Type.STRING, description: "Prompt de 10-15 palabras para crear un banner de LinkedIn (aspecto 16:9)" },
    copilot_image_prompt: { type: Type.STRING, description: "Prompt de 10-15 palabras para crear una imagen cuadrada (aspecto 1:1)" }
  },
  required: [
    "matchPercentage",
    "justification",
    "linkedin_long",
    "linkedin_ats",
    "copilot_long",
    "copilot_ats",
    "linkedin_image_prompt",
    "copilot_image_prompt"
  ]
};

const generateTextContent = async (jobDescription: string, resume: string, tone: string): Promise<TextContent> => {
  const prompt = `
    System Instruction: Eres un experto en reclutamiento y optimización de perfiles para sistemas de seguimiento de candidatos (ATS) a nivel mundial. Tu tarea es analizar una hoja de vida en comparación con una descripción de vacante y generar contenido profesional optimizado. Debes responder exclusivamente en formato JSON.

    User Prompt:
    Analiza la siguiente vacante y hoja de vida. El tono deseado para el contenido generado es: "${tone}".

    **Vacante:**
    ${jobDescription}

    **Hoja de Vida:**
    ${resume}

    Realiza las siguientes tareas y devuelve el resultado en el formato JSON especificado en el schema:
    1. Calcula un porcentaje de compatibilidad (match) entre la hoja de vida y la vacante.
    2. Proporciona una justificación breve para el porcentaje, destacando fortalezas y áreas de mejora.
    3. Genera una publicación de formato largo para LinkedIn.
    4. Genera un resumen optimizado para ATS para LinkedIn.
    5. Genera una publicación de formato largo y contundente para una plataforma profesional genérica.
    6. Genera un resumen optimizado para ATS para una plataforma profesional genérica.
    7. Basado en el puesto, genera un prompt para crear una imagen de banner para LinkedIn.
    8. Basado en el puesto, genera un prompt para crear una imagen cuadrada.
  `;

  const response = await ai.models.generateContent({
    model: textModel,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema,
    },
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as TextContent;
};

const generateImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: imageModel,
    contents: {
      parts: [{ text: prompt }],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      const mimeType = part.inlineData.mimeType;
      return `data:${mimeType};base64,${base64ImageBytes}`;
    }
  }
  throw new Error("No se pudo generar la imagen.");
};

export const generateAllContent = async (jobDescription: string, resume: string, tone: string): Promise<GeneratedContent> => {
  const textContent = await generateTextContent(jobDescription, resume, tone);

  const [linkedin_image_url, copilot_image_url] = await Promise.all([
    generateImage(textContent.linkedin_image_prompt),
    generateImage(textContent.copilot_image_prompt),
  ]);

  return {
    ...textContent,
    linkedin_image_url,
    copilot_image_url,
  };
};
