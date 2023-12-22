const express = require('express');
const router = express.Router();
const { Task } = require('./model');

// GET ROUTE--------------------------

//  POST GET ROUTE

router.get('/all-tasks', async (req, res) => {
  const status = req.query.status;
  const email = req.query.email; 
  const query = { status: status, userEmail: email }; 

  try {
    const result = await Task.find(query);
    console.log(result)
    res.send(result);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// SINGLE POST GET ROUTE

    router.get('/single-task/:id', async(req,res) => {
      try{
        const id = req.params.id
      const result = await Task.findById(id)
      console.log(result)
      res.send(result)
      } catch (error) {
        console.error('Error fetching task:', error.message);
        res.status(500).send('Internal Server Error');
      }
    })
  
// POST ROUTE-------------------------

// ADD TASK POST ROUTE

    router.post('/add-task', async(req, res) => {
      try {
        const task = new Task(req.body);
      const result = await task.save()
      res.send(result)
      } catch (error) {
        console.error('Error adding task:', error.message);
    res.status(500).send('Internal Server Error');
      }
    })


    
// UPDATE ROUTE ------------------
// TASK STATUS UPDATE ROUTE

router.put('/update-task-status/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { $set: { status } }, { new: true });

    if (updatedTask) {
      res.send(updatedTask);
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// TASK EDIT ROUTE

  router.put('/edit-task/:id', async(req, res) => {
    try {
      const id = req.params.id
      console.log('edit data id', id)
      const data = req.body
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
          $set: {
            TaskTitle: data.TaskTitle,
            TaskDescription: data.TaskDescription,
            Deadlines: data.Deadlines,
            Priority: data.Priority,
          },
        },
        { new: true }
      );
      if (updatedTask) {
        res.send(updatedTask);
      } else {
        res.status(404).send({ error: 'Task not found' });
      }
     
    } catch (error) {
      console.error('Error updating task:', error);
    res.status(500).send({ error: 'Internal Server Error' });
    }
  })

    // DELETE ROUTE-------------------

    // TASK DELETE ROUTE
    
    router.delete('/delete-task/:id', async (req, res) => {
      const id = req.params.id;
      try {
      const result = await Task.findByIdAndDelete(id)
      res.send(result)
      } catch (error) {
        console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
      }
    })


module.exports = router;
