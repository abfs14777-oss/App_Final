const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const User = require("../models/userModel");

// AES Encryption setup
const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.JWT_SECRET, "salt", 32);

// Encrypt function
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
};

// Decrypt function
const decrypt = (text) => {
    const [ivHex, encrypted] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Input Validation
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!validator.isLength(username, { min: 3 })) {
            return res.status(400).json({ message: "Username must be at least 3 characters" });
        }
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if username already exists
        const existingUsers = await User.find();
        const userExists = existingUsers.some(u => decrypt(u.username) === username);
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Encrypt username & hash password
        const encryptedUsername = encrypt(username);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username: encryptedUsername, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: `user registered with the user name ${username}` });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input Validation
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find all users and decrypt to find match
        const users = await User.find();
        const user = users.find(u => decrypt(u.username) === username);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Output Sanitization 
        res.status(200).json({ 
            token,
            user: {
                id: user._id,
                username: username,
                role: user.role
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { register, login };