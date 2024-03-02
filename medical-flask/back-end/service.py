from flask import Flask, request, jsonify
from flask_cors import CORS
import gemini_util as genAi
from PIL import Image

from pymongo import MongoClient
from io import BytesIO
import base64
app=Flask(__name__)

CORS(app)
@app.route("/api/analyze",methods=['POST'])
def analyze():
    prompt = """
    As a highly skilled medical practitioner specializing in image analysis, you are tasked with examining medical images for a renowned hospital. Your expertise is crucial in identifying any anomalies, diseases, or health issues that may be present the images.
    You Responsibilities include:
    1. Respond only if the picture was related to medical diagnosis or any health issues other than that just reply user with "sorry I cant determine what the uploaded picture is. If any help needed regarding health issues feel free to ask assisstance" and end the chat
    1. Detailed Analysis: Thoroughly identify each image, focusing on identifying any abnormal findings.
    2. Findings Report: Document all observed anomalies or signs of disease. Clearly articulate these findings in a structured format.
    3. Recommendations and Next Steps: Based on your analysis, suggest potential next steps, including further tests or treatments as applicable.
    4. Treatment Suggestions: If appropriate, recommend possible treatment options or interventions.
    Important Notes:

    1. Scope of Response: Only respond if the image pertains to human health issues. 
    2. Clarity of Image: In cases where the image quality impedes clear analysis, note that certain aspects are 'Unable to be determined based on the provided image.'
    3. Disclaimer: Accompany your analysis with disclaimer: "Consult with a Doctor before making any decisions."
    4. Your insights are invaluable in guiding clinical decisions. Please proceed with the analysis, adhering to the structured approach outlined above.
    please provide me an output response with these four headings detailed analysis, finding report, recommendations and next steps, treatment suggestions
    """
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['chat_history']
    try:
        uploaded_file = request.files['image']
        if uploaded_file is not None:
            image=Image.open(uploaded_file)
            buffered = BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        if not prompt or not image:
            return jsonify({'error': 'Prompt and image are required.'}), 400
        
        # Call the function to interact with the OpenAI API
        response = genAi.get_gemimi_image(prompt, image)
        entry = {
            'image': img_str,
            'response': response
        }
        collection.insert_one(entry)
    except Exception as e:
        print(e)
    return response

@app.route("/api/get_chat_history", methods=['GET'])
def get_chat_history():
    # Retrieve chat history from MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['chat_history']
    chat_history = list(collection.find({}, {'_id': 0}))
    return jsonify(chat_history)


@app.route("/api/register",methods=['POST'])
def register():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['users']
    data = request.json
    name=data.get('name')
    email=data.get('email')
    phone=data.get('phone')
    password=data.get('password')
    user_data={
        'name':name,
        'email':email,
        'phone':phone,
        'password':password
    }
    try:
        collection.insert_one(user_data)
        return "registered succesfuuly"
    except Exception as e:
        return False


    

@app.route("/api/login", methods=['POST'])
def login():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['users']
    data = request.json
    email=data.get('email')
    password=data.get('password')
    user_data={
        'email':email,
        'password':password
    }
    user = collection.find_one({'email': email, 'password': password})
    if user:
        return "login successfull"
    else:
        return False



if __name__=="__main__":
    app.run(debug=True)