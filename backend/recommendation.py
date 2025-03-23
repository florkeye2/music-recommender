from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

def recommend_songs_using_t5(track_name):
    # Encode the track name with a recommendation prompt
    input_text = f"Recommend songs similar to {track_name}"
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    # Generate song recommendations
    outputs = model.generate(input_ids, max_length=50, num_return_sequences=5)

    recommendations = []
    for output in outputs:
        recommendation = tokenizer.decode(output, skip_special_tokens=True)
        recommendations.append(recommendation)
    return recommendations
