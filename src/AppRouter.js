import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function AppRouter() {
    const copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright ⓒ "}
                fsoftwareengineer, {new Date().getFullYear()}
                {"."}
            </Typography>
        );
    }
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<App />} />
                </Routes>
            </div>
            <div>
                <Box mt={5}>
                    {copyright}
                </Box>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;

