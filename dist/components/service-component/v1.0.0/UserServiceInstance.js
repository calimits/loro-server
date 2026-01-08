import { SupabaseStorage } from "../../../tests/mocks/SupabaseStorage.js";
import { mongoTransactionManager } from "../../database-component/v1.0.0/MongoTransactionManagerInstance.js";
import { tokenDB } from "../../database-component/v1.0.0/TokenMongoDBModelInstance.js";
import { userDB } from "../../database-component/v1.0.0/UserMongoDBModelInstance.js";
import { bcrypt } from "../../encryption-component/v1.0.0/BCryptInstance.js";
import { jwtProvider } from "../../token-provider-component/v1.0.0/JWTProviderInstance.js";
import { validatorFactory } from "../../validation-component/v1.0.0/ValidatorFactoryInstance.js";
import { UserService } from "./UserService.js";
//implmenet supabase storage
export const userService = new UserService(userDB, bcrypt, jwtProvider, validatorFactory, tokenDB, mongoTransactionManager, new SupabaseStorage());
