import jwt from "jsonwebtoken";

export const generateJWT = (payload: any, expiresIn: string): string => {
    const option = {
        expiresIn
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, option);
    return token;
}

export const verifyJWT = (jwt_token: string): boolean => {
    try {
        jwt.verify(jwt_token, process.env.JWT_SECRET as string);
        return true;
        
    } catch (error: any) {
        return false;
    
    }
}

export const decodeJWT = (token: string): any => {
    const payloadToken = jwt.decode(token);
    return payloadToken;
}