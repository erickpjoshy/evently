'use server'

import { CreateUserParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/modals/user.modal"
import { UpdateUserParams } from "@clerk/types"
import { revalidatePath } from "next/cache"
import Event from "../mongodb/database/modals/event.modal"
import Order from "../mongodb/database/modals/order.model"

export const createUser = async (user:CreateUserParams) =>{
try{
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
}
catch(error){
    handleError(error)
}
}

export async function getUserById(userId: string) {
    try {
      await connectToDatabase()
  
      const user = await User.findById(userId)
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
  }

export const updateUser = async (clerkId : string ,user : UpdateUserParams) =>{
    try{
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({clerkId}, user , {new:true})

        if(!updatedUser)throw new Error('User Update Failed');

        return JSON.parse(JSON.stringify(updatedUser))
    }
    catch(error){
            handleError(error);
    }
}

export const deleteUser = async (clerkId:string) =>{
    try {
        await connectToDatabase();
        const userDelete = await User.findOne({clerkId})

        if (!userDelete){
            throw new Error ('User not found')
        }

        await Promise.all([
            // Update the 'events' collection to remove references to the user
            Event.updateMany(
              { _id: { $in: userDelete.events } },
              { $pull: { organizer: userDelete._id } }
            ),
      
            // Update the 'orders' collection to remove references to the user
            Order.updateMany({ _id: { $in: userDelete.orders } }, { $unset: { buyer: 1 } }),
          ])

          const deleteUser = await User.findByIdAndDelete(userDelete._id);
          revalidatePath('/')

          return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null

    }
    catch(error){
            handleError(error)
    }
}