# Team Incognitos

## Team Members
- Sujit Maiti
- Rahul Das
- Jason D'Souza
- Sanish Aukhale

## Project summary
To built up a custom health assistant with features like basic check-up, reminders etc.

## Project description
Using Google Actions with DialogFlow API, a simple health assistant will help anyone to access it anywhere when required.
1. **Basic Q&A**
- An introductory set of questions will be asked when a user accesses it first. If any symptoms are found, user will be given particular suggestions.
2. **Reminders**
- Remind about when to take medicines if set.
3. **Emergency contacts**
- Give contact details about nearby hospitals/health centers in case of an emergency.

## How to deploy?
1. Clone this repository.
2. Setup required APIs through Google Console (DialogFlow API).
3. Upload the .json files to get the intents on Google Actions.
4. Create a webhook locally by running a Flask server.
- Install necessary python requirements
```
pip install flask
```
- Run the python file
```
python app.py
```
(Note: This flask app is configured to run on Heroku, so additional files like Procfile are present)
