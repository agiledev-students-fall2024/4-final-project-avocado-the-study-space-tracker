import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

//Mock data array representing saved routes in database
const savedRoutes = [
    {
        _id: "route1",
        name: "Route 1",
        userId: "123456789",
        stores: [
            {
                _id: "store1",
                name: "Test Store",
                location: "Test Location"
            }
        ]
    },
    {
        _id: "route2",
        name: "Route 2",
        userId: "123456789",
        stores: [
            {
                _id: "store2",
                name: "Another Test Store",
                location: "Another Test Location"
            }
        ]
    }
]

// Middleware to authenticate JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};

// Get all saved routes for a user, given the userId
router.get("/saved", verifyToken, (req, res) => {
    try {
        const userRoutes = savedRoutes.filter(route => route.userId === req.user.userId)

        if (!userRoutes.length) {
            return res.status(404).json({ message: "No route found for this user!"})
        }

        res.json(userRoutes)
    } catch (error) {
        res.status(500).json({message: "Error fetching user routes", error})
    }
})

// Get specific route by routeId
router.get("/:routeId", verifyToken, (req, res) => {
    try {
        const { routeId } = req.params
        const route = savedRoutes.find(route => route._id === routeId)

        if (!route) {
            return res.status(404).json({ message: "Route not found"})
        }

        res.json(route)
    } catch (error) {
        res.status(500).json({ message: "Error fetching route", error})
    }
})

export default router;