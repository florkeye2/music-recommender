from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load the T5 tokenizer and model
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

def recommend_songs_using_t5(track_name):
    input_text = f"Recommend songs similar to {track_name}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    # Generate song recommendations
    outputs = model.generate(input_ids, max_length=200, num_return_sequences=1)

    # Decode the generated outputs into a list of song recommendations
    recommendations = []
    for output in outputs:
        recommendation = tokenizer.decode(output, skip_special_tokens=True)
        recommendations.append(recommendation)
    return recommendations
