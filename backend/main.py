from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
import json
import os
from groq import Groq
from dotenv import load_dotenv

# Env variables load karo
load_dotenv()

# 1. SABSE PEHLE 'app' DEFINE KARNA HAI
app = FastAPI(title="InternAI API")

# React ko API call karne allow karne ke liye CORS zaroori hai
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Development ke liye sab allow kar rahe hain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq Client setup (make sure .env file mein GROQ_API_KEY ho)
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Domains list
VALID_DOMAINS = [
    'Software Development', 'Data Science & AI', 'Web Development', 
    'Mobile App Development', 'UI/UX Design', 'Cybersecurity', 
    'Cloud Computing', 'Digital Marketing', 'Business Analytics', 
    'Product Management', 'Research & Development', 'Mechanical Engineering', 
    'Electrical Engineering', 'Civil Engineering', 'Biotechnology', 
    'Content Writing', 'Graphic Design', 'Finance & Accounting', 
    'Human Resources', 'Sales & Marketing'
]

# 2. AB ROUTE LIKHO (Kyunki app ab define ho chuka hai)
@app.post("/api/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported for now.")
    
    try:
        # PDF se text nikalna
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        resume_text = ""
        for page in pdf_reader.pages:
            resume_text += page.extract_text() + "\n"
            
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

        # Groq AI prompt
        prompt = f"""
        You are an expert HR and Career AI Assistant. Analyze the following resume text.
        Extract the candidate's core skills and suggest the top 2-3 internship domains they are best suited for.
        
        You MUST choose the domains ONLY from this exact list: {VALID_DOMAINS}
        
        Respond ONLY in a valid JSON format like this:
        {{
            "skills": ["skill1", "skill2"],
            "recommended_domains": ["Domain 1", "Domain 2"]
        }}
        
        Resume Text:
        {resume_text}
        """

        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-8b-8192", 
            temperature=0.3,
            response_format={"type": "json_object"} 
        )
        
        result_json = json.loads(chat_completion.choices[0].message.content)
        return result_json

    except Exception as e:
        print(f"Error parsing resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Error analyzing resume with AI.")

# Agar aapke paas /api/chat ya /api/internships routes the pehle, toh wo yahan neeche paste kar dena