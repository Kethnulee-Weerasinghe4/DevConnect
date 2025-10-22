import express, { Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devconnect'; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


// MONGOOSE SCHEMA AND MODEL

interface IDeveloper extends Document {
  name: string;
  bio: string;
  skills: string[];
  github: string;
  linkedin: string;
}

const DeveloperSchema: Schema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Developer name is required'],
    trim: true 
  },
  bio: { type: String, required: false },
  skills: { type: [String], required: false }, 
  github: { type: String, required: false },
  linkedin: { type: String, required: false },
}, { timestamps: true }); 

const Developer = mongoose.model<IDeveloper>('Developer', DeveloperSchema);


// API ROUTES 

// GET 
app.get('/api/developers', async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.search as string;
        let query: any = {};

        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');

            query = {
                $or: [
                    { name: { $regex: regex } },
                    { skills: { $regex: regex } }
                ]
            };
        }

        const developers = await Developer.find(query);
        res.status(200).json(developers);
    } catch (error) {
        console.error('Error fetching developers:', error);
        res.status(500).json({ message: 'Server error while searching profiles' });
    }
});

// POST 
app.post('/api/developers', async (req: Request, res: Response) => {
    try {
        const { name, bio, skills, github, linkedin } = req.body;

        const skillArray = Array.isArray(skills) 
                           ? skills 
                           : (skills ? skills.split(',').map((s: string) => s.trim()).filter(s => s) : []);

        const newDeveloper = new Developer({
            name, bio, skills: skillArray, github, linkedin,
        });
        
        const savedDeveloper = await newDeveloper.save();
        res.status(201).json(savedDeveloper);
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Error creating developer:', error);
        res.status(500).json({ message: 'Server error while creating profile' });
    }
});


// GET 
app.get('/api/developers/:id', async (req: Request, res: Response) => {
    try {
        const developer = await Developer.findById(req.params.id);
        
        if (!developer) {
            return res.status(404).json({ message: 'Developer not found' });
        }
        
        res.status(200).json(developer);
    } catch (error) {
        console.error('Error fetching single developer:', error);
        res.status(400).json({ message: 'Invalid developer ID' }); 
    }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
