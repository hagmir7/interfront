'use client'
import React, { useEffect, useState } from "react";
import { User } from "@/services/auth";
import { Mail, Phone, MapPin, User2, Package, Lock, Percent } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserOrder from "@/components/UserOrder";
import UserAddress from "@/components/UserAddress";
import ChangePassword from "@/components/auth/ChangePassword";
import UpdateProfile from "@/components/auth/UpdateProfile";
import { useRouter } from "next/navigation";
import UserDiscount from "@/components/UserDiscount";
import LogoutButton from "@/components/ui/LogoutButton";

export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const data = await User();
            if(!data){
                router.push('/user/login');
            }
            setUser(data);
        })();
    }, []);

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[40vh] text-gray-500 text-lg">
                Chargement du profil...
            </div>
        );
    }

    return (
        <Tabs defaultValue="orders" className="max-w-7xl mx-auto mt-4 md:mt-6 bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
            {/* GRID WRAPPED INSIDE TABS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1 px-1 md:pt-6 md:px-6 pb-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-1 ">

                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm flex flex-col" >
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800 text-center lg:text-left">
                                {user.full_name || `${user.first_name} ${user.last_name}`}
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
                                @{user.name || "Utilisateur"}{" "}
                                <strong>{user.code ? "• " + user.code : ""}</strong>
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    <span>{user.phone || "—"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <span>{user.address || <span className="italic text-gray-400">Adresse non définie</span>}</span>
                                </div>
                                {
                                    user.gender && <div className="flex items-center gap-3 text-gray-700">
                                        <User2 className="w-5 h-5 text-blue-600" />
                                        <span>{user.gender || "—"}</span>
                                    </div>
                                }
                                
                            </div>
                        </div>
                      
                    </div>
                    {/* Tabs Navigation */}
                      <div className="mt-7 bg-gray-50 rounded-xl p-4 shadow-sm flex flex-col border border-gray-100">
                        
                            <TabsList className="flex flex-col h-auto gap-2 w-full bg-transparent p-0 shadow-none">
                                <TabsTrigger
                                    value="orders"
                                    className="w-full justify-start text-left text-lg cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                                >
                                    <Package className="w-7 h-7 text-blue-600" />
                                    Mes Commandes
                                </TabsTrigger>

                                <TabsTrigger
                                    value="address"
                                    className="w-full justify-start text-left text-lg px-4 py-2 cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                                >
                                    <MapPin className="w-7 h-7 text-blue-600" />
                                    Adresse
                                </TabsTrigger>

                                <TabsTrigger
                                    value="discount"
                                    className="w-full justify-start text-left text-lg px-4 py-2 cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                                >
                                    <Percent className="w-7 h-7 text-blue-600" />
                                    Remises
                                </TabsTrigger>

                                 <TabsTrigger
                                    value="update_profile"
                                    className="w-full justify-start text-left text-lg px-4 py-2 cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                                >
                                    <User2 className="w-7 h-7 text-blue-600" />
                                    Modifier le profil
                                </TabsTrigger>

                                <TabsTrigger
                                    value="password"
                                    className="w-full justify-start text-left text-lg px-4 py-2 cursor-pointer rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                                >
                                    <Lock className="w-7 h-7 text-blue-600" />
                                    Mot de passe
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        {/* Logout Button */}
                        <LogoutButton className="mt-8 hidden lg:block w-full px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm shadow transition-all">
                            Déconnexion
                        </LogoutButton>
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2">
                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <UserOrder user_id={user.id} />
                    </TabsContent>

                    {/* Address Tab */}
                    <TabsContent value="address">
                        <UserAddress user_id={user.id} />
                    </TabsContent>

                     {/* Profile update */}
                       
                    <TabsContent value="update_profile">
                        <UpdateProfile user={user} />
                    </TabsContent>

                     {/* change Password */}
                    <TabsContent value="password">
                        <ChangePassword user_id={user.id} />
                    </TabsContent>

                     <TabsContent value="discount">
                        <UserDiscount user_id={user.id} />
                    </TabsContent>

                  
                </div>
            </div>
        </Tabs>
    );
}
