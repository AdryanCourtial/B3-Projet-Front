import { useAtom } from 'jotai';
import { gameStatisticsAtom } from '../../../../atoms/gameAtom';


export default function GameStatistics() {
    const [statistics] = useAtom(gameStatisticsAtom);

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">Statistiques des Questions</h2>
            <ul className="w-full max-w-4xl">
                {statistics.map((stat, index) => (
                    <li key={index} className="p-4 mb-4 border rounded-lg bg-gray-100">
                        <h3 className="text-lg font-semibold">{stat.question}</h3>
                        <p className="text-sm">
                            Bonne réponse : <span className="font-bold">{stat.correctAnswer}</span>
                        </p>
                        <div className="mt-2">
                            <h4 className="text-md font-semibold">Choix des utilisateurs :</h4>
                            <ul>
                                {Object.entries(stat.stats.choices).map(([choice, count]) => (
                                    <li key={choice}>
                                        {choice}: {count} vote(s)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
