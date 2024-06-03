from flask import Flask, render_template, request, jsonify
from fastai.vision.all import *
from fastai.learner import load_learner 

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['POST'])
def post_data():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400

    if file:
        # Process the file here
        print(f"Received file: {file.filename}")
        learn_inf = load_learner('./models/export.pkl')
        img = PILImage.create(file)
        pred,pred_idx,probs = learn_inf.predict(img)
        print(pred)
        return jsonify(f'Prediction: {pred}; Probability: {probs[pred_idx]:.04f}')

if __name__ == "__main__":
    app.run(debug=True)
