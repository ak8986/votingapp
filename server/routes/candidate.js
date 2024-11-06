const express = require ("express");
const User = require('../models/user');
const Candidate = require('../models/candidate');
const router = express.Router();
const {jwtAutMiddleware, generationToken} = require('./jwt');


const checkAdminRole = async(userId) => {
    try{
        const user = await User.findById(userId);
        return user.role == 'admin';
    }catch(err){
        return false;
    }
}
// POST route for adding person
router.post('/', jwtAutMiddleware, async (req, res) => {
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(401).json({message: 'user has not admin role'});
        
      const data = req.body // Assuming the request body contains the person data
      // create a new newUser document using the mongoose model
      const newCandidate = new Candidate(data);
      // newUser.name = data.name;
  
      const response = await newCandidate.save();
      console.log('data saved');

      res.status(200).json({response: response });
  }
  catch(err){
      console.log(err);
      res.status(500).json({error: 'internal server error'});
  }
  })

  router.get('/:candidateID', jwtAutMiddleware,async(req, res) => {
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user has not admin role'});
        const candidateID = req.params.candidateID;
        const response = await Candidate.findById(candidateID)
        if (!response){
            return res.status(404).json({err: 'candidate not found'});
        }

        console.log('candidate data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})

router.put('/:candidateID', jwtAutMiddleware,async(req, res) => {
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user has not admin role'});
        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body; //
        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true, //return the updated document
            runValidators: true, //run mongoose validation
        })
        if (!response){
            return res.status(404).json({err: 'candidate not found'});
        }

        console.log('candidate data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})

router.delete('/:candidateID', jwtAutMiddleware,async(req, res) => {
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user has not admin role'});
        const candidateID = req.params.candidateID;
               const response = await Candidate.findByIdAndDelete(candidateID);
        if (!response){
            return res.status(404).json({err: 'candidate not found'});
        }

        console.log('candidate deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})

// let's start voting
router.post('/vote/:candidate', jwtAutMiddleware, async(req, res) => {
   

    try {
        const candidateID = req.params.candidate;
        const userId = req.user.id;
    
        // Find the candidate by ID
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(401).json({ err: 'Candidate not found' });
        }
    
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
    
        // Check if the user has already voted
        if (user.isVoted) {
            return res.status(400).json({ message: 'User has already voted' });
        }
    
        // Admins are not allowed to vote
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admin is not allowed to vote' });
        }
    
        // Initialize votes array if undefined (for extra safety)
        if (!candidate.votes) {
            candidate.votes = [];
        }
    
        // Add the user's vote to the candidate's votes array
        candidate.votes.push({ user: userId });
        candidate.voteCount++; // Increment the vote count
    
        // Save the candidate after updating votes and count
        await candidate.save();
    
        // Mark the user as having voted and save the user document
        user.isVoted = true;
        await user.save();
    
        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
})


router.get('/vote/count', async(req, res) => {
    try{
        // find all candidates and sort them by voteCount in decensing order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        //map the candidates to only return their name and votecount
        const voteRecord = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            }
        });

        return res.status(200).json(voteRecord);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }

})

router.get('/', async (req, res) => {
    try{
        const candidateDate = await Candidate.find();
        console.log('data fetched');
        res.status(200).json(candidateDate);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'enternal server error'});
    }
}
)
module.exports = router;