import os
from typing import List, Dict, Optional
from transformers import pipeline
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.generator = pipeline("text-generation", model="distilgpt2")
        self.system_prompt = """
        You are an expert presentation coach and designer. 
        Your role is to help create professional presentations while maintaining user's original ideas.
        Always provide clear, actionable feedback and suggestions.
        """

    def generate_questions(self, content: str, topic: str, audience: str) -> List[str]:
        """Generate clarifying questions based on user input"""
        prompt = f"""
        Based on this content: '{content}'
        Generate 3-5 clarifying questions to help structure a presentation about '{topic}'
        for the audience: '{audience}'
        """
        
        # Use Hugging Face pipeline for text generation
        full_prompt = self.system_prompt + "\n" + prompt
        response = self.generator(full_prompt, max_length=256, num_return_sequences=1)[0]["generated_text"]
        return response.split('\n')

    def generate_slides(self, content: str, topic: str, audience: str) -> List[Dict]:
        """Generate slide content based on user input"""
        prompt = f"""
        Create a professional slide deck based on this content: '{content}'
        Topic: '{topic}'
        Audience: '{audience}'
        Generate slides with titles, key points, and speaker notes.
        """
        
        # Use Hugging Face pipeline for text generation
        full_prompt = self.system_prompt + "\n" + prompt
        response = self.generator(full_prompt, max_length=512, num_return_sequences=1)[0]["generated_text"]
        return self._parse_slide_response(response)

    def generate_visual_style(self, topic: str, audience: str) -> Dict:
        """Generate visual style recommendations"""
        prompt = f"""
        Create a visual style for a presentation about '{topic}'
        for the audience: '{audience}'
        Include color scheme, font recommendations, and layout suggestions.
        """
        
        # Use Hugging Face pipeline for text generation
        full_prompt = self.system_prompt + "\n" + prompt
        response = self.generator(full_prompt, max_length=256, num_return_sequences=1)[0]["generated_text"]
        return self._parse_visual_response(response)

    def _parse_slide_response(self, response: str) -> List[Dict]:
        """Parse slide generation response into structured format"""
        # Implementation to parse the response into slide format
        pass

    def _parse_visual_response(self, response: str) -> Dict:
        """Parse visual style response into structured format"""
        # Implementation to parse the visual style response
        pass
