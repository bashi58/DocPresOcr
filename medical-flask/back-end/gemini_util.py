from dotenv import load_dotenv
import os
import google.generativeai as genAi
load_dotenv()
apiKey=os.getenv("Gemini_API_key")
genAi.configure(api_key=apiKey)
def get_gemimi_image(prompt,image):
    model=genAi.GenerativeModel("gemini-pro-vision")
    response=model.generate_content([prompt,image])
    return response.text