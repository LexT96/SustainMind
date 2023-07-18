import { Box } from "@mui/material"

const getScoreColor = (score: number) => {
    if (score >= 7.5)
        return "bg-red-500"
    if (score >= 3)
        return "bg-yellow-500"
    return "bg-green-500"
}

const getScoreWidth = (score: number) => {
    return `${score / 10 * 100}%`
}

export const RiskScore = ({score}: {score: number}) => {
    return (
      <>
        <div className="w-full rounded h-2 bg-gray-300">
        <Box sx={{width: getScoreWidth(score)}} className={`${getScoreColor(score)} rounded h-2`}/>
        </div>
        <p className="text-xs">Average risk score: {score}</p>
      </>
    );
}