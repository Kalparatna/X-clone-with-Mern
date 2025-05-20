import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notis = await Notification.find({ to: userId }).sort({ createdAt: -1 })
            .populate({
                path: "from",
                select: "username profileImg"
            })

        if (!notis) return res.status(200).json({ error: "No notifications found" });   

        await Notification.updateMany({ to: userId }, { isRead: true });
        res.status(200).json(notis);
    } catch (error) {
        console.log("getNotifications controller: ", error);
        return res.status(500).json({ error : "Something went wrong" });
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });
    } catch (error) {
        console.log("deleteNotifications controller: ", error);
        return res.status(500).json({ error : "Something went wrong" });
    }
}