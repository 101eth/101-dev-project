import { PrismaClient, Prisma } from "@prisma/client";
import { randomBytes } from "crypto";
import { ethers } from "ethers";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  names,
} from "unique-names-generator";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const prisma = new PrismaClient();

const BADGES: Prisma.BadgeCreateInput[] = [
  {
    name: "Olympus Badge",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmexSQtGfukH7tUBZdzUA9QEEJ3KnwbHKeWnWRkgLm1KfL",
  },
  {
    name: "Intro to 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmejDiuvnvyE4jwUZiS5KSnZwomCQVBnf7JmiQa6FjmZKB",
  },
  {
    name: "Intro to Popcorn",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmf1FeuyfwgQvPRbqgaGaqcg5voEMzjNHHRMU8k6fWch9b",
  },
  {
    name: "Investor Guide to $GRANT",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmRd1GjHNfTTDgp4ULYQzgvFSL6PoHZqMK1ykjhkqF2b9d",
  },
  {
    name: "What is Web3?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmeGjYMBgZTeGDUjChVhXhPSSYbyw1h6h4ufV2gHHksPBf",
  },
  {
    name: "Introduction to NFTs",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmSd9M8kMz2BXuJTXbZ5CvbxRJtLTQrU9bCUmCo2S6NcpR",
  },
  {
    name: "Intro to DeFi",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmb68JKiKrkYXi1GzYRtXWWHKzvkUQNCTLRPgCKSxYbXwg",
  },
  {
    name: "Intro to Web3",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWJYt2y5Ucu1p1zwFF1FiAt1e1BrjBAi2HqsZ9M9ZY5x4",
  },
  {
    name: "Blockchain 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmcGdbh7nH7YLuiSG51BwdnxGVwqzcwW56Hc5TE3zeEojf",
  },
  {
    name: "What is Beanstalk",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTUD8DRWuYA1okUVzFRjX22wc9XyKMmZsqnuKiGPxfyhN",
  },
  {
    name: "What is Beanstalk",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTUD8DRWuYA1okUVzFRjX22wc9XyKMmZsqnuKiGPxfyhN",
  },
  {
    name: "Blockchain Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmVbTG1FqdBbmgY5jmUGh8Vq93o1NVbsDEYyu7ukXtCmt7",
  },
  {
    name: "Blockchain Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmVbTG1FqdBbmgY5jmUGh8Vq93o1NVbsDEYyu7ukXtCmt7",
  },
  {
    name: "Blockchain Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmVbTG1FqdBbmgY5jmUGh8Vq93o1NVbsDEYyu7ukXtCmt7",
  },
  {
    name: "What is Beanstalk",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTUD8DRWuYA1okUVzFRjX22wc9XyKMmZsqnuKiGPxfyhN",
  },
  {
    name: "What is Beanstalk",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTUD8DRWuYA1okUVzFRjX22wc9XyKMmZsqnuKiGPxfyhN",
  },
  {
    name: "Learn to Lucid Dream",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbNrnVS1EzTykwFGQpa1PH3543qHhRgrJE79rSgoNZsH8",
  },
  {
    name: "Intro to IDriss.xyz",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPcDdjnDa5nkHT5q3LWW3UKF4SPecxkt9z2HCcpESZq39",
  },
  {
    name: "Intro to IDriss.xyz",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPcDdjnDa5nkHT5q3LWW3UKF4SPecxkt9z2HCcpESZq39",
  },
  {
    name: "Como preparar sua carteira Metamask no seu celular",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmSPHeeDLYDEKq4C6C7oumA6awgjHx7MJt4EQKuMwUpuoZ",
  },
  {
    name: "HoneyDAO Onboarding",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTHBXD7asJEzqQoK1sxjzzP6p6HTBPBQU6GxLkri565M2",
  },
  {
    name: "Basic Discord Security",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmciLko8VWNUkbp6jLA33PbURKEFt8M4UPpFqYrFs5h1Z1",
  },
  {
    name: "Basic Discord Security",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmciLko8VWNUkbp6jLA33PbURKEFt8M4UPpFqYrFs5h1Z1",
  },
  {
    name: "Wallet Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmcxSnSVoUpSEWhGhgiGRUpVgBdFVySkFxLrWudmZ59oXL",
  },
  {
    name: "Wallet Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmcxSnSVoUpSEWhGhgiGRUpVgBdFVySkFxLrWudmZ59oXL",
  },
  {
    name: "Wallet Safety Essentials",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmY7H4yWsMTuHFvwbETxmXLagx3JezUupzK7h3zRQWz2Av",
  },
  {
    name: "Ledger 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmUssLzaF7ZxHWDxnkFC8tf1LcGngkY3ELTKsoCMyYpaUr",
  },
  {
    name: "Como preparar sua carteira Metamask no seu celular",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmSPHeeDLYDEKq4C6C7oumA6awgjHx7MJt4EQKuMwUpuoZ",
  },
  {
    name: "Como preparar sua carteira Metamask no Google Chrome",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Wallet Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmVsTQSLyu1oTRu17jFYPFZ1yXUm4sNEbYnsG15YfsecnF",
  },
  {
    name: "Intro to Women in Web3",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTPB7eEz3CkwZBZyCm4iFVQ7CB6FhGaeScUuzUqU4rbU6",
  },
  {
    name: "Intro to Women in Web3",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTPB7eEz3CkwZBZyCm4iFVQ7CB6FhGaeScUuzUqU4rbU6",
  },
  {
    name: "Test course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmY7H4yWsMTuHFvwbETxmXLagx3JezUupzK7h3zRQWz2Av",
  },
  {
    name: "Ledger 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmUssLzaF7ZxHWDxnkFC8tf1LcGngkY3ELTKsoCMyYpaUr",
  },
  {
    name: "Ledger 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmUssLzaF7ZxHWDxnkFC8tf1LcGngkY3ELTKsoCMyYpaUr",
  },
  {
    name: "Building a Simple Ethereum Wallet from Scratch Quiz",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmf6qbpYXLtR573JjymfzmaSoNN3pLe3NRjwKvReeo9arn",
  },
  {
    name: "Basic Discord Security",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmciLko8VWNUkbp6jLA33PbURKEFt8M4UPpFqYrFs5h1Z1",
  },
  {
    name: "Adicionando novas Redes, Tokens e NFTs no Metamask",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Como preparar sua carteira Metamask no Google Chrome",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Preparando sua Metamask no Google Chrome",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Preparando sua Metamask no Google Chrome",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "A Origem da Tecnologia Blockchain",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Como preparar sua carteira Metamask no seu celular?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Entendendo os elementos de uma rede blockchain",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "Como converter criptomoedas em Real?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXu8sasugtf2qz81VKoufezcByLPzgdVK5p4j3XQ29nnu",
  },
  {
    name: "How to Set Discord Default Server Permissions",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYXSmdWWvTDJFQ3QkJBS1AoL7JABtmeF5D1trYKQFGZKx",
  },
  {
    name: "101 to the Moon ???",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmRy6uBaZuCsydNoxBJaAjhRChrmTwYCCAB3oLMyviyaWy",
  },
  {
    name: "Building a Simple Ethereum Wallet from Scratch Quiz",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmd4zzdwHBv14jvDzGaCst7RBk4L4KudcoEzbjUFjnyNX4",
  },
  {
    name: "Building a Simple Ethereum Wallet from Scratch Quiz",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmd4zzdwHBv14jvDzGaCst7RBk4L4KudcoEzbjUFjnyNX4",
  },
  {
    name: "Coinbase Wallet SDK",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYUbMC5fTN2zKuyTCggszRxgvmTZ6JHDsVcHwuqp16MSw",
  },
  {
    name: "The ReFi movement",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmNZxEUUUNZpot12XYVsyNsTXTpmU5GozZNM9cVsJsHEa2",
  },
  {
    name: "Voting on a DAO",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmajBPcK2s84W75WeBqyDTsM2vpBQSWzsgbcTmuVoNaV2P",
  },
  {
    name: "How to disable DMs on Discord",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYXSmdWWvTDJFQ3QkJBS1AoL7JABtmeF5D1trYKQFGZKx",
  },
  {
    name: "What is blockchain?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYbvfaZ41DRdubm589bMmmkZMDUNAG32MYXv6yP6xh4rQ",
  },
  {
    name: "What is web3?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYbvfaZ41DRdubm589bMmmkZMDUNAG32MYXv6yP6xh4rQ",
  },
  {
    name: "Intro to yield farming",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmeCXxozansHtyYmH3q59nsqFeH19DCNT2xusMKh5Uap44",
  },
  {
    name: "HOW TO DISABLE DMS ON DISCORD",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYXSmdWWvTDJFQ3QkJBS1AoL7JABtmeF5D1trYKQFGZKx",
  },
  {
    name: "What is AMBCrypto?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmRD3Jkh8M9zQEUMP39qRUePdYJtyQkKk8dj2oZEkDqnHX",
  },
  {
    name: "Example Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Example Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPQjDcVTgf6AxcSmoJYVYroRfXa9u2mFtzXy6peZub9M6",
  },
  {
    name: "Example Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Example Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Example Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Smart Wallets",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Intro to 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmeCXxozansHtyYmH3q59nsqFeH19DCNT2xusMKh5Uap44",
  },
  {
    name: "Scarlet DAO Pass V1",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmfDnooGPE9W5espiLKiV2Q1f5b9ArN19SGyY7b4UsKnGT",
  },
  {
    name: "Intro to 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPQjDcVTgf6AxcSmoJYVYroRfXa9u2mFtzXy6peZub9M6",
  },
  {
    name: "O que são NFTs?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmZYFBSWT4eD1YcTdWgpAAUMsnFgrMq1nQwiPpfnenvxGm",
  },
  {
    name: "NFT Launchpad 5 Days Workshop",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmesYEnicA5t8KsroskTQik1XZPwtmj51q6HhEZa35EJw2",
  },
  {
    name: "First time on Celo",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmRy6uBaZuCsydNoxBJaAjhRChrmTwYCCAB3oLMyviyaWy",
  },
  {
    name: "Celo Test Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Celo Test Course 2",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Intro to Voltz",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmUKqkRGbpNMn7M3ekvCsM8beXyk5vtbMCuodcxNJoLLaX",
  },
  {
    name: "Intro to DeSo for Creators",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTKUPtmXJzPnTnvFcRb8YfTo9tYpNYgPwbLBzWuAXL9dL",
  },
  {
    name: "Intro to 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPNwNDMy341pgRsrWurGZXAAjLZMZ1LdB6xnu84fF3HHR",
  },
  {
    name: "Intro to 101 ",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYR4e9h2WBWg7E7ZyiAsBkqg25qWoMTvq7EsFXHDjsvyy",
  },
  {
    name: "Intro to 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXdWimhBj8q2KxV3SCyAmviSDpZxE3XEqUr4ctgcMNgF1",
  },
  {
    name: "Intro to 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXdWimhBj8q2KxV3SCyAmviSDpZxE3XEqUr4ctgcMNgF1",
  },
  {
    name: "Intro to Idle protocol",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWHK9Vr893mGjXbxR45AYrR5NNHeHsY6DqGX36QpqCvng",
  },
  {
    name: "Learn to Lucid Dream",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPNFhK5DeYtP4MhtX2sCti88wxTrJU5m8pig7aX4CDVS9",
  },
  {
    name: "Blockchain 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmP6nG6ESF9B5g2WPgQ1rD1FbeyRGkfqZZfq5Z6PAgnjH4",
  },
  {
    name: "Intro to 40acres",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmZ1ubKvRMjH7ci2CJnwG51VyfgSozYynnFWGMe77hnNWo",
  },
  {
    name: "TL:DR: NFTs",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWCnjUz7RYABdgsGLtmf45XSNos3pkChWWViJj2KheMRz",
  },
  {
    name: "Test course with GIF",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmQTuvGabUbs2eVPcD2LTBW6fqgX6CdDx4s7yPvW9SWdGu",
  },
  {
    name: "Test Course",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPvMQrQBGa8cFnDGdtbemW1uPVj154XYTQtBZsPqhgnAa",
  },
  {
    name: "Decent Survey Completion",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTfWN4h3kNduo1cSNg1SibjmT1SDgjN4q4ZFd5nRC7WAe",
  },
  {
    name: "Voltz Protocol General Concepts",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmazrDEmj7hvi54qmTM26QXbL4D8Dv1BqtLzp4cFsHTRVe",
  },
  {
    name: "Decent User Survey",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmcUp5FycKMWSPy5C84JWih6XBF7WYDrkMRWQJN8H4V6G5",
  },
  {
    name: "Testeeeee",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmf5o174vSVcVLgkXb9B9hvqpHzVSs48EHTfjQnFxCJmn8",
  },
  {
    name: "Discord Moderation Basics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qmf7qqWnbnaXm1SMvmKfdDvsrw8wa8PapLitz2fjqUskUJ",
  },
  {
    name: "Intro to Interest Compounding ETH",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmQsR28kHL7jc93fBGdYBy4XqQg8WiddMYVbYDqH4ef2oK",
  },
  {
    name: "Introduction to Remix",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmQmPz3sTyXSTc28kRascXqAqYXm5LBw5RpGufdaJfibU4",
  },
  {
    name: "Introduction to Remix",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmQmPz3sTyXSTc28kRascXqAqYXm5LBw5RpGufdaJfibU4",
  },
  {
    name: "Introduction to Etherscan",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmNwhB2HNPbRXYYAXa4uvU6PXwzVDGSbgsxHKBkLFagaKg",
  },
  {
    name: "Introduction to CryptoZombies ",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmZnXghQ9wrbgpTQy9Zf1F6akC1T4GzM4dYnYYnwSzXGRc",
  },
  {
    name: "Blockchain 101",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmaUbdv4awirgiQpdTVfA7vSDKUWSQDtbfoJAUb4MoNAHa",
  },
  {
    name: "Tracer Voyage - Phase 2",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmdFRVwkvA2jnZtLfaiieVrZt2WKvvU5xzMBXQBTjuJ5Jc",
  },
  {
    name: "Intro to Etherscan",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmenvoL8BgVkh6KgoAp7V7bjPx8nGKic9cXeNJyFJtmLXj",
  },
  {
    name: "The Hunt :: NFT NYC Token 2",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmZdJddGruLJN2AJo2hyotHHDhya5G7992x4pzEscPNkLf",
  },
  {
    name: "Ed3 Podcast",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmSZLMbP5AZdyJxBcwPWReosEvPU6JoenNpn9Rwwph8EKY",
  },
  {
    name: "How to create a crypto wallet",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmfD45x54xhhA1UwUb36HtVngMWFgdNZgvUS4iszeLXBzR",
  },
  {
    name: "Create a Crypto Wallet",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmfD45x54xhhA1UwUb36HtVngMWFgdNZgvUS4iszeLXBzR",
  },
  {
    name: "CDB Advanced Mathematics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmSsgXEew98rKPkNAVU4LubHnaV637wcjPSFHZNnwu6phk",
  },
  {
    name: "Intro to Women in Web3",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmV3F2y25Jadx5kvKJ4sNCzEzKtKyyW9HimDGccXhFw1oa",
  },
  {
    name: "CDB Advanced Mathematics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmcYk3tkcfy87xnhVr7bBQ2MwCyYotuRhcyfqo323QTEFG",
  },
  {
    name: "CDB Advanced Mathematics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbJn5RVJeskNZdpmbgu8noBkcjzrrTi8qCu17G47RrmcW",
  },
  {
    name: "Metaleap University's NFT Workshop ",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmRsd2oB6bzWhna9bX5n1W4kbPykRiLizhdgADe5B9f4nS",
  },
  {
    name: "Into to the Moonlab system",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmeRTak2Dd1512yVawRzY3UNMyUppwbxSV4uwahRwX2i38",
  },
  {
    name: "Metaleap's MetaRobot NFTs",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmUhCA8Z9NkByo4RuWKzKDUHhhFDgcxU1xK716TEx8GhzW",
  },
  {
    name: "Scarlet DAO: An Introduction",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qman2jvcfzYBY6ZR9Xh6CopFjH6NhANMJCgJhBLJ9F397p",
  },
  {
    name: "Understanding Hop Protocol",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmTBfFYqNyBc8F8PMwVswGiUDkrnxSwk6otkFaLCJxCR4e",
  },
  {
    name: "Thirdweb Deploy",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qma2tfK29uD7cyeaDo8vNVDLMgnrk9RpAREstw8xd2yQof",
  },
  {
    name: "Intro to Lit Protocol",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmaDZvkWWCbAxczqd9h2t9ZhCdtoFf72NZn48qU1WVunAs",
  },
  {
    name: "What is Lens?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmaS562hZhbjv7QC92dNibVJjNeZHxVDrSuD5Jn7dJtKPJ",
  },
  {
    name: "Intro to The Graph",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYFGiTrAmEwXe4WpQZe7qK6Qag7KpgBB7BddhzaefyENd",
  },
  {
    name: "Blockchain and Discord Security Information Session",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmQEXwRjXq7RdAxDwUbJsjgPC6J4mxqtpwEoSztPViBsKR",
  },
  {
    name: "Intro to Tokenomics",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWnbv94PLBHywyYDrBvU9864QU5QScncbWYdstQNGrNZh",
  },
  {
    name: "Intro to Pyth Network",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmZ5HiXGyNnXDmL6kNrfq9DRZGAxiEKefSuUgUZ7uYvgCm",
  },
  {
    name: "Introduction to Forefront",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/Qma6hvwPizZMW9FH2VVoyfXLhVDD7sUdQFnMgQHBmWgShV",
  },
  {
    name: "Introduction to TBA DAO",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbGyqxXXLKQgzy3UTbgSTMUzRpStUVfQKYdzFvWyyraMR",
  },
  {
    name: "Introduction to Verci",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmZXd4vh1f5oseUqSQkzJqAyXgHJNf9RqSQapNZMfzRDzw",
  },
  {
    name: "Intro to Rutgers Blockchain Hub",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmSSgJEmtQQxuQKPtv16Lsr6WFVY6bqiM7ehM4UNaoRZkR",
  },
  {
    name: "Testeeeee",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmfBq7YDN5pfmUEqd22Lf8NxyR3sQx5Ca3TCyBKSCGys1z",
  },
  {
    name: "Testeeeee",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmfBq7YDN5pfmUEqd22Lf8NxyR3sQx5Ca3TCyBKSCGys1z",
  },
  {
    name: "ArborDAO - Basic Operations",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbBU5LByyDytTxsbxaK4Fbq3Jc7QKpqUDmPNcx5zyfYCw",
  },
  {
    name: "Introduction to Verci ✌",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXXMdkymoJ7qfWNu4vZcUTwWMMoJH91vcWf2o9987MP5J",
  },
  {
    name: "Intro to NFTs",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmPkgcZ9zYWo3q3FhsMKiiCcfxRUUxiTTJSxsy8NS3NMYW",
  },
  {
    name: "Welcome to Blu3 DAO 🦋 (Test)",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmYxwRXt96YGp3d9W6531KpPCCV2XqWUAKrCQcE4ukzrYJ",
  },
  {
    name: "Intro to DAOs",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmUEjXhSuZ9jStTzmbfgBUFvfmVzPNK4NydomBeAYLqmxn",
  },
  {
    name: "Create a Trust Wallet",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmNsfYzrcRe2R8SBKaS1ziArKJF873St43HuFDH2krqCKG",
  },
  {
    name: "Intro to Pinata",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmXabHcZmcneby4nh1tQDHvK3Hpm6Fo24LA9h578RYj6g4",
  },
  {
    name: "Intro to Web3",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbHLQnugUvWqccCbdsnyQAaHU18PiSo1Yf5jVURz5ZcuH",
  },
  {
    name: "Intro to Blockchain",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmeDC9hUg6Ef8bhFiAPqDaqD2fFLAa9pnCD6hjCE8fA5rP",
  },
  {
    name: "Welcome to Students DAO ",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmWBLqvK3m6fqmvTpWowpFc7pD9PThmctzGYxVYgY2Ks6K",
  },
  {
    name: "Intro to Pinata",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmR7YhtmfQpyHcBNdDEnys7Zxa3BZpd7zC9AScstthVG6B",
  },
  {
    name: "[testnet] Intro to 0x",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmexegxWiS82f9KxLxPALf9pn65yQcxxttfpfH41j6xFsx",
  },
  {
    name: "MoonLab HQ's Tech Stack",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmcnM3ESkmqZfAsXFtB8R6WdXk7CqZRgoBQziPPpYgFF89",
  },
  {
    name: "What is Quadratic Funding?",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmU5PYCsts4Ezg8dAa2pM3KJsTnYB1UaFzWLggBgWsdweW",
  },
  {
    name: "How Harpie Stops Scams",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmVT5SKak9D63NGWQPdGqXkubDatPgDSP5j5Qb1aawkvVN",
  },
  {
    name: "Get to know TBA DAO",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbGyqxXXLKQgzy3UTbgSTMUzRpStUVfQKYdzFvWyyraMR",
  },
  {
    name: "Using Frontrunners to Prevent Scams",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmVT5SKak9D63NGWQPdGqXkubDatPgDSP5j5Qb1aawkvVN",
  },
  {
    name: "Understanding Swapped Finance",
    imageUrl: "https://cloudflare-ipfs.com/ipfs/QmbGSULmWVCb3fZVi27WxHq2YhjxSkbRwejuiSUQdh3qDG",
  },
  {
    name: "Intro to Guild",
    imageUrl: "ipfs://QmSYhKfBTRS7wN6abX6sE2KD85Z1D1SbwadZTzt4GzchPc",
  },
  {
    name: "Third Academy Test",
    imageUrl: "ipfs://QmYNa2DTnPdwmeKD5yM1dr91FZ1Ba6kQqxC6NmMWQPV8qi",
  },
  {
    name: "Intro to Protocol Labs",
    imageUrl: "ipfs://QmXNhuBDuiVYbzGuS7pEpiRXHG9F1NJr9J4SxdaeseXzn5",
  },
  {
    name: "SheFi Blockchain Baddie 101 ",
    imageUrl: "ipfs://QmUiv9JUDyBribhfxahuswKotff9DBydtHEebGtbQrwARP",
  },
  {
    name: "NFT's 101 ",
    imageUrl: "ipfs://QmSCrEjxrWwCMeRXhjh2TuQBhnpmz4HSz3rUd2DfRSvXhm",
  },
  {
    name: "Level 1 Coloneer",
    imageUrl: "ipfs://QmXZ8nPBbtry9QsA9CUrqDRQ2CvcUpvbcmduwq1rzMagaz",
  },
  {
    name: "Intro to Colony",
    imageUrl: "ipfs://QmTp19TU59vNBZ7zp7TRrNWhM8WLuTAvCxnPC4fPpjUSqP",
  },
  {
    name: "Get to know DAOwah ",
    imageUrl: "ipfs://Qmc2VUyu8UFp4x8saeXYxJcfiFrDz7PZbx7Lt5kYYjqb73",
  },
];

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export async function main() {
  try {
    console.log(`Start seeding ...`);

    const badges = await Promise.all(
      BADGES.map((badge) => prisma.badge.create({ data: badge }))
    );

    const userData: Prisma.UserCreateInput[] = [
      {
        name: "tim connors",
        wallet: "timc.eth",
        badges: {
          create: badges.map((badge) => ({
            Badge: { connect: { id: badge.id } },
            dateEarned: randomDate(new Date(2012, 0, 1), new Date()),
          })),
        },
      },
      {
        name: "alec velikanov",
        wallet: "alecv.eth",
        badges: {
          create: badges.slice(2, badges.length).map((badge) => ({
            Badge: { connect: { id: badge.id } },
            dateEarned: randomDate(new Date(2012, 0, 1), new Date()),
          })),
        },
      },
    ];

    while (userData.length < 100) {
      const id = randomBytes(32).toString("hex");
      const privateKey = "0x" + id;
      const wallet = new ethers.Wallet(privateKey);

      const n = getRandomInt(badges.length - 5);
      const random = badges.sort(() => 0.5 - Math.random()).slice(0, n);

      userData.push({
        name: uniqueNamesGenerator({
          dictionaries: [adjectives, names, colors],
          separator: " ",
          length: 2,
        }),
        wallet: wallet.address,
        badges: {
          create: random.map((badge) => ({
            Badge: { connect: { id: badge.id } },
            dateEarned: randomDate(new Date(2012, 0, 1), new Date()),
          })),
        },
      });
    }

    console.log(userData);
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().then(() => console.log("Done!"));
