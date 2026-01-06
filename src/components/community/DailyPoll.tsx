"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDailyPoll, PollQuestion } from "@/data/polls";

export function DailyPoll() {
    const [poll, setPoll] = useState<PollQuestion | null>(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [voteChoice, setVoteChoice] = useState<"yes" | "no" | null>(null);
    const [stats, setStats] = useState({ yes: 0, no: 0, total: 1000 });

    useEffect(() => {
        // Load Question
        const question = getDailyPoll();
        setPoll(question);

        // Load Vote Status
        const localVote = localStorage.getItem(`poll_vote_${question.id}`);
        if (localVote) {
            setHasVoted(true);
            setVoteChoice(localVote as "yes" | "no");
        }

        // Simulate Stats (based on base percentage + random variance)
        const variance = Math.floor(Math.random() * 10) - 5; // +/- 5%
        const yesPercent = question.yesPercentage + variance;

        setStats({
            yes: yesPercent,
            no: 100 - yesPercent,
            total: 1240 + Math.floor(Math.random() * 500) // Simulated total votes
        });

    }, []);

    const handleVote = (choice: "yes" | "no") => {
        if (!poll) return;
        setHasVoted(true);
        setVoteChoice(choice);
        localStorage.setItem(`poll_vote_${poll.id}`, choice);
    };

    if (!poll) return null;

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900">Päivän Kysymys</h3>
                    <p className="text-sm text-slate-500">Vastaa anonyymisti ja näe tilanne.</p>
                </div>
            </div>

            <h4 className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
                "{poll.question}"
            </h4>

            {!hasVoted ? (
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        onClick={() => handleVote("yes")}
                        variant="outline"
                        className="h-20 text-lg border-2 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all group"
                    >
                        <Check className="w-6 h-6 mr-2 text-slate-400 group-hover:text-emerald-600" /> Kyllä
                    </Button>
                    <Button
                        onClick={() => handleVote("no")}
                        variant="outline"
                        className="h-20 text-lg border-2 hover:border-slate-400 hover:bg-slate-50 transition-all"
                    >
                        <X className="w-6 h-6 mr-2 text-slate-400" /> En
                    </Button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className={voteChoice === "yes" ? "text-emerald-700 font-bold" : "text-slate-600"}>
                                    Kyllä {voteChoice === "yes" && "(Sinä)"}
                                </span>
                                <span className="text-slate-900">{stats.yes}%</span>
                            </div>
                            <Progress value={stats.yes} className="h-4 bg-slate-100" indicatorClassName="bg-emerald-500" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className={voteChoice === "no" ? "text-slate-700 font-bold" : "text-slate-600"}>
                                    Ei {voteChoice === "no" && "(Sinä)"}
                                </span>
                                <span className="text-slate-900">{stats.no}%</span>
                            </div>
                            <Progress value={stats.no} className="h-4 bg-slate-100" indicatorClassName="bg-slate-400" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> {stats.total} vastaajaa
                        </div>
                        <div>
                            {stats.yes > 50 && (
                                <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                                    Et ole yksin.
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
