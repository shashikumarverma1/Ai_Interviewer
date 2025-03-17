
export default function FeedbackCard({ data, index }) {

    function fixObjectReferences(str) {
        return str.replace(/\[object Object\]/g, () => {
            return ""
        });
    }

    return (
        <div className="flex justify-center items-center  bg-gray-100 p-4 min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
            <div className=" w-full bg-white shadow-lg rounded-2xl p-6">
                {
                    index == 0 && <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Feedback Summary</h2>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold">Name:</span> {data.name}</p>
                            <p className="text-gray-700"><span className="font-semibold">Email:</span> {data.email}</p>
                            <p className="text-gray-700"><span className="font-semibold">Timestamp:</span> {new Date(data?.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                }

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
                    <p className="text-gray-600">{data.question.question.replace('[object Object]', JSON.stringify(data.question))}</p>
                    <p className="text-sm text-gray-500">Focus: {data.question.focus}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Your Answer</h3>
                    <p className="text-gray-600">{data.answer}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
                    <p className="text-gray-600">{fixObjectReferences(data.feedback,)}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Improvement Suggestion</h3>
                    <p className="text-gray-600">{fixObjectReferences(data.improvement)}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Score</h3>
                    <p className={`text-lg font-bold ${Number(data.score) > 0 ? 'text-green-500' : 'text-red-500'}`}>{data.score}/100</p>
                </div>
            </div>
        </div>
    );
}