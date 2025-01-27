import jwt from "jsonwebtoken";

const JWT_SECRET = "8ad868a8-8998-4e93-b8f5-3313e987debb";

export const generateJWT = (payload: any, expiresIn: string): string => {
    const option = {
        expiresIn
    }

    

    const token = jwt.sign(payload, JWT_SECRET as string, option);
    return token;
}