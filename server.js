const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Job = require('./models/Job');
const cors = require('cors'); // Import cors
require('dotenv').config(); // Load .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define GraphQL schema
const schema = buildSchema(`
  type Job {
    id: ID!
    title: String!
    company: String!
    location: String!
    link: String!
  }

  type Query {
    jobs: [Job]
  }

  type Mutation {
    addJob(title: String!, company: String!, location: String!, link: String!): Job
    deleteJob(id: ID!): Job # New mutation for deleting a job
  }
`);

// Define resolvers for the GraphQL API
const root = {
  jobs: async () => {
    try {
      return await Job.find(); // Fetch all jobs from MongoDB
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  },
  addJob: async ({ title, company, location, link }) => {
    try {
      const job = new Job({ title, company, location, link });
      await job.save(); // Save the new job in MongoDB
      return job;
    } catch (error) {
      console.error('Error adding job:', error);
      throw new Error('Failed to add job');
    }
  },
  deleteJob: async ({ id }) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(id); // Use findByIdAndDelete instead of findByIdAndRemove
      if (!deletedJob) {
        throw new Error('Job not found');
      }
      return deletedJob;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error('Failed to delete job');
    }
  },
};

// Create an Express app
const app = express();

// Enable CORS for all routes and methods
app.use(cors()); // This enables CORS for all origins

// GraphQL API endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing queries
  })
);

// Start the server
app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
