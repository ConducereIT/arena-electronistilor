import React, { useState, useEffect } from "react";


interface ScoreResponse {
  status: number;
  answers?: { [key: string]: number };
  msgErr?: string;
}

const Scoredisplay: React.FC = () => {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const isUserAuthenticated = true; 

    if (isUserAuthenticated) {
     
      const userToken = "userToken123"; 
      
      fetch(`/api/getAnswersQuickRound?token=${userToken}`)
        .then((response) => response.json())
        .then((data: ScoreResponse) => {
          if (data.status === 200 && data.answers) {
            setScores(data.answers);
          } else {
            console.error(data.msgErr || "Eroare la obținerea scorurilor");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Eroare la solicitarea scorurilor:", error);
          setLoading(false);
        });
    } else {
      console.log("Utilizatorul nu este autentificat.");
      setLoading(false);
    
    }
  }, []);


  const renderScores = () => {
    if (loading) {
      return <p>Se încarcă scorurile...</p>;
    } else if (Object.keys(scores).length === 0) {
      return <p>Nu există scoruri disponibile.</p>;
    } else {
      return (
        <ul>
          {Object.entries(scores).map(([question, score]) => (
            <li key={question}>
              Întrebarea {question}: Scor - {score}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <h1>Pagina Scoredisplay</h1>
      {renderScores()}
    </div>
  );
};

export default Scoredisplay;
