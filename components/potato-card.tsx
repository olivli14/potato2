"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getContract, createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import { potatoABI } from "@/app/abi";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {} from "wagmi";
import WalletProvider, { wagmiConfig } from "./wallet-provider";
import { readContract } from "@wagmi/core";
import Link from "next/link";

const CONTRACT_ADDRESS = "0x6a750EbcD76de10dd9da6364BE6Cc155eD44Cb6B";

export function PotatoCard() {
    
    const { isConnected } = useAccount(); 
    const { data: hash, writeContract } = useWriteContract();
    const addRecentTransaction = useAddRecentTransaction();

    const [potato, setPotato] = useState(0);
    const [sourcream, setSourcream] = useState(0);
    const [cheese, setCheese] = useState(0);
    const [bacon, setBacon] = useState(0);
    const [chives, setChives] = useState(0);

    async function readPotato(){
        try {

    
            const ingredients = await readContract(wagmiConfig, {
                 address: CONTRACT_ADDRESS,
                 abi: potatoABI,
                 functionName: 'getIngredients',
            }) as number[];
            setPotato(ingredients[0]);
            setSourcream(ingredients[1]);
            setCheese(ingredients[2]);
            setBacon(ingredients[3]);
            setChives(ingredients[4]);
        } catch (error) {
            console.error("Error reading ingredients:", error);
        }
    };
3
    async function buyPotato(potatoAmount: number, sourcreamAmount: number, cheeseAmount: number, baconAmount: number, chivesAmount: number) {
        await readPotato();
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: potatoABI,
            functionName: "buyPotato",
            args: [potatoAmount, sourcreamAmount, cheeseAmount, baconAmount, chivesAmount],
        });
            // Add transaction to recent transactions
        if (hash) {
            console.log("hash: ", hash);
            addRecentTransaction({
                hash: hash,
                description: "Buy a potato",                    confirmations: 2,
            });
        }
        
    };


    async function addIngredients(potatoAmount: number, sourcreamAmount: number, cheeseAmount: number, baconAmount: number, chivesAmount: number) {
        await readPotato();
        
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: potatoABI,
            functionName: "addIngredient",
            args: [potatoAmount, sourcreamAmount, cheeseAmount, baconAmount, chivesAmount],
        });
        console.log("Ingredients added successfully");
    }

    async function submitPotatoes(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const num = formData.get("num") as string;
        console.log("num: ", num);
        const numPotatoes = parseInt(num);
        addIngredients(numPotatoes, 0, 0, 0, 0);
    }

    async function submitSourcream(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const num = formData.get("num") as string;
        console.log("num: ", num);
        const numSourcream = parseInt(num);
        addIngredients(0, numSourcream, 0, 0, 0);
    }


    async function submitCheese(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const num = formData.get("num") as string;
        console.log("num: ", num);
        const numCheese = parseInt(num);
        addIngredients(0, 0, numCheese, 0, 0);
    }

    
    async function submitBacon(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const num = formData.get("num") as string;
        console.log("num: ", num);
        const numBacon = parseInt(num);
        addIngredients(0, 0, 0, numBacon, 0);
    }
    async function submitChives(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const num = formData.get("num") as string;
        console.log("num: ", num);
        const numChives = parseInt(num);
        addIngredients(0, 0, 0, 0, numChives);
    }

    async function submitBuyPotato(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const potatoAmount = parseInt(formData.get("potato") as string);
        const sourcreamAmount = parseInt(formData.get("sourcream") as string);
        const cheeseAmount = parseInt(formData.get("cheese") as string);
        const baconAmount = parseInt(formData.get("bacon") as string);
        const chivesAmount = parseInt(formData.get("chives") as string);
        buyPotato(potatoAmount, sourcreamAmount, cheeseAmount, baconAmount, chivesAmount);
    }

    if (isConnected) {
        return (
          <Card className="m-2">
            <CardHeader>
              <CardTitle>Baked Potato Shop</CardTitle>
              <CardDescription>
                Total supply: 
                <br />
                Potatoes: {potato.toString()}
                <br />
                Sour Cream: {sourcream.toString()}
                <br />
                Cheese: {cheese.toString()}
                <br />
                Bacon: {bacon.toString()}
                <br />
                Chives: {chives.toString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={readPotato}>Read Potato Contract</Button>
              <Separator className="my-3" />

              {/* Form to add Potatoes */}
              <form onSubmit={submitPotatoes}>
                <Input name="num" type="number" placeholder="Add Potatoes" required />
                <Button type="submit">Add Potatoes</Button>
              </form>

              {/* Form to add Sour Cream */}
              <form onSubmit={submitSourcream}>
                <Input name="num" type="number" placeholder="Add Sour Cream" required />
                <Button type="submit">Add Sour Cream</Button>
              </form>

              {/* Form to add Cheese */}
              <form onSubmit={submitCheese}>
                <Input name="num" type="number" placeholder="Add Cheese" required />
                <Button type="submit">Add Cheese</Button>
              </form>

              {/* Form to add Bacon */}
              <form onSubmit={submitBacon}>
                <Input name="num" type="number" placeholder="Add Bacon" required />
                <Button type="submit">Add Bacon</Button>
              </form>

              {/* Form to add Chives */}
              <form onSubmit={submitChives}>
                <Input name="num" type="number" placeholder="Add Chives" required />
                <Button type="submit">Add Chives</Button>
              </form>

              <Separator className="my-3" />

              {/* New Card for Buying Potatoes */}
              <Card className="m-2">
                <CardHeader>
                  <CardTitle>Buy Potato</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={submitBuyPotato}>
                    <Input name="potato" type="number" placeholder="Number of Potatoes" required />
                    <Input name="sourcream" type="number" placeholder="Number of Sour Creams" required />
                    <Input name="cheese" type="number" placeholder="Number of Cheeses" required />
                    <Input name="bacon" type="number" placeholder="Number of Bacons" required />
                    <Input name="chives" type="number" placeholder="Number of Chives" required />
                    <Button type="submit">Buy Potato</Button>
                  </form>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter>
              <p>
                Transaction hash{" "}
                <Link href={`https://sepolia.basescan.org/tx/${hash}`}>{hash}</Link>
              </p>
            </CardFooter>
          </Card>
        );
      } else {
        return (
          <Card className="m-2">
            <CardHeader>
              <CardTitle>Please connect your wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        );
    }


}