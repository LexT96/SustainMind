const getScoreColor = (score: number) => {
    if (score >= 7.5)
        return "bg-green-500"
    if (score >= 3)
        return "bg-yellow-500"
    return "bg-red-500"
}

export const ProductScore = ({score}: {score: number}) => {
    return (
      <>
        <div className={`${getScoreColor(score)} w-full rounded h-2`}/>
        <p className="text-xs">ESG-Score: {score}</p>
      </>
    );
}