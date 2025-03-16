import { useState } from "react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  let recognition: { continuous: boolean; interimResults: boolean; onresult: (event: any) => void; onend: () => void; start: () => void; stop: () => void; };

  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText( transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  } else {
    console.warn("Speech Recognition is not supported in this browser.");
  }
console.log(text , "dddddddddddddddd")
  const startListening = () => {
    if (recognition) {
      recognition.start();
      // setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Speech to Text</h2>
      <button onClick={startListening} disabled={isListening} style={{ marginRight: "10px" }}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>{text}</p>
    </div>
  );
};

export default SpeechToText;
