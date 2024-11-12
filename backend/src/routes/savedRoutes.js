import express from "express";
const router = express.Router
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
// Get specific route by routeId
router.get("/route/:routeId", (req, res) => {
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
// Get all saved routes for a user, given the userId
route.get("/user/:userId", (req, res) => {
    try {
        const { userId } = req.params
        const userRoutes = savedRoutes.filter(route => route.userId === userId)
        if (!userRoutes.length) {
            return res.status(404).json( {message: "No route found for this user!"})
        }
        res.json(userId)
    } catch (error) {
        res.status(500).json({message: "Error fetching user routes", error})
    }
})

export default router;