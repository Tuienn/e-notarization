import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface Ball3DProps {
    content: string
    color: "green" | "blue" | "orange"
}

const Ball3D: React.FC<Ball3DProps> = (props) => {
    const getGradient = () => {
        switch (props.color) {
            case "green":
                return "radial-gradient(circle at 30% 30%, #a5f3a1, #16a34a)"
            case "blue":
                return "radial-gradient(circle at 30% 30%, #93c5fd, #2563eb)"
            case "orange":
                return "radial-gradient(circle at 30% 30%, #fdba74, #ea580c)"
            default:
                return "radial-gradient(circle at 30% 30%, #ddd, #999)"
        }
    }

    return (
        <Box
            sx={{
                width: { xs: 40, md: 70 },
                height: { xs: 40, md: 70 },
                borderRadius: "50%",
                background: getGradient(),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `
      inset -10px -10px 20px rgba(0,0,0,0.25),
      inset 10px 10px 20px rgba(255,255,255,0.2),
      0 10px 20px rgba(0,0,0,0.3)
    `,
                position: "relative",
                "&::before": {
                    position: "absolute",
                    top: "15%",
                    left: "20%",
                    width: "25%",
                    height: "25%",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.4)",
                    filter: "blur(4px)"
                }
            }}
        >
            <Typography fontWeight="bold" fontSize={{ xs: 18, md: 24 }} color="white">{props.content}</Typography>
        </Box>
    )
}

export default Ball3D