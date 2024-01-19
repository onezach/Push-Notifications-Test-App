# Evaluating Push Notification Modalities
This brief application was developed using React Native for a set of user studies. The goal was to evaluate user preferences for different push notification modalities while they completed some primary task (in this case, the task was to copy text into an on-screen textbox). 
## Initialization
Users are first asked to input 5 random numbers (0-31). These numbers act as a seed for this particular user's experience (see below).
## Testing
Users are then prompted to complete two sets of testing: one round with 5 default OS push notifications triggering while they type and one round with 5 custom-built push notifications. The custom push notifications vary along 5 different dimensions:
- Presence of an App Icon (yes/no)
- Vibration (yes/no)
- Duration of Visibility On-Screen (4sec/12sec)
- Subjective Formality of Font: (informal/formal)
- Background Color (red/yellow)

Each of the 5 numbers the user inputs initially corresponds to 1 custom push notification that they receive, with each bit in the 5-bit binary representation of that number corresponding to which of the variables are toggled on (e.g. 25 --> 11001 --> icon, vibration, 4 seconds, informal font, yellow).
## Evaluation
We ultimately measured the accuracy of each user's text-copying and push notification information retention, as well as collected qualitative preferences.