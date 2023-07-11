import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useTransition, animated } from "@react-spring/web";
import { Link } from 'react-router-dom';

const quizData = [
    { question: "Answer a few questions and find out if you have to comply with the German Supply Chain Due Diligence Act", answers: ["Start"] },
    { question: "Do you have your principal office, main branch, administrative headquarters, statutory seat or a branch office in Germany?", answers: ["Yes", "No"] },
    { question: "How many workers do you usually employ in Germany (including parent company workers, workers sent abroad, temporary workers who work at least 6 months for your company)?", answers: ["below 1000", "1000 to 2999", "3000 or more"] },
    // Add more questions as needed
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [result, setResult] = useState('');
    const [resultText, setResultText] = useState('');

    const handleAnswerButtonClick = (answer: string) => {
        if (currentQuestion === 1 && answer === "No") {
            setResult("The Supply Chain Due Diligence Act does not apply to your company!");
            setResultText("But investors increasingly invest in ESG-friendly companies and new regulations are on their way (see EU directive)! SustainMind helps you to make your Supply Chains ready for the future!");
            setShowScore(true);
        } else if (currentQuestion === 2) {
            if (answer === "below 1000") {
                setResult("The Supply Chain Due Diligence Act does not apply to your company!");
                setResultText("But investors increasingly invest in ESG-friendly companies and new regulations are on their way (see EU directive)! SustainMind helps you to make your Supply Chains ready for the future!");
            } else {
                setResult("The Supply Chain Due Diligence Act applies to your company!");
                setResultText("But no worries, we have developed a software that gives you clear ToDo's and makes compliance easy for you!");
            }
            setShowScore(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const transitions = useTransition(currentQuestion, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });

    return (
        <section id="quiz" className="bg-white py-8 sm:py-2">
            <div className="mx-auto max-w-7xl sm:px-6" style={{ overflow: 'visible' }}>
                <div className="relative isolate pt-20" style={{ overflow: 'visible' }}>

                    <div style={{ position: 'relative', height: '300px' }}>
                        {showScore ? (
                            <Card sx={{ boxShadow: 3 }}>
                                <CardContent>
                                    <p className="font-bold tracking-tight text-gray-900 sm:text-2xl" style={{ marginTop: "5px" }}>{result}</p>
                                    <p style={{ marginTop: "10px", marginBottom: "20px", lineHeight: "1.2", fontSize: "1.2em" }} className="text-gray-600">
                                        {resultText}
                                    </p>
                                    <Link to="/login">
                                        <button type="submit" className="flex-none rounded-md bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                            Sign up
                                        </button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ) : (
                            transitions((styles, item) =>
                                <animated.div style={{ ...styles, position: 'absolute', width: '100%' }}>
                                    <Card sx={{ boxShadow: 3 }}>
                                        <CardContent>
                                            <p className="font-bold tracking-tight text-gray-900 sm:text-2xl" style={{ marginTop: "5px" }}>Does the Supply Chain Due Diligence Act apply to your company?</p>
                                            <p style={{ marginTop: "10px", marginBottom: "20px", lineHeight: "1.2", fontSize: "1.2em" }} className="text-gray-600">
                                                {quizData[item].question}
                                            </p>
                                            {quizData[item].answers.map((answer) => (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleAnswerButtonClick(answer)}
                                                >
                                                    {answer}
                                                </Button>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </animated.div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Quiz;
