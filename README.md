Exercise 

Create a node app with express, mongo and redis .. 
	Problem -- For a given user, shopping list
		On Load, Can add a Task, For a given task, can add sub task, - Update both redis and mongo
		On Retrieval - Only Redis
		On Create/Update - Both
		View Page -- Minute wise task created (React Router)
	
	Step 1:
		Build for Dev and prod instance (Webpack )
			Additional if we can support hot relaoding in dev
		Run standalone
		
	Step 2:
		Create multiple build with docker multi-stage (build, dev, and prod)
		Create multiple container of mongo and express with mounted volume for mongo (not redis as redis can be repopulated) data persistence and using network layer of docker
		
	Step 3
		Go ahead and start consuming with docker compose (take network in mind)
			
	Step 4
		GO ahead and make changes with kompose (kubernetes)
		
		
		

