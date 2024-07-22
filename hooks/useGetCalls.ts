import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if(!client || !user?.id) return;
            
            setIsLoading(true);

            try {
                const { calls } = await client.queryCalls({
                    sort: [{field: 'starts_at', direction: -1}],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ]
                    }
                });

                setCalls(calls)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        loadCalls();
    }, [client, user?.id]);

    const now = new Date();

    const endedCalls = calls.filter(({state: {startsAt, endedAt, custom}}: Call) => {
        // return(startsAt && new Date(startsAt) < now || !!endedAt)
        return(startsAt && new Date(startsAt) < new Date(now.setTime(new Date().getTime() - (30 * 60 * 1000))) || !!endedAt )
    });
    
    const upcomingCalls = calls.filter(({ state: { startsAt, custom }}: Call) => {
        // return(startsAt && new Date(startsAt) > now)
        return startsAt && new Date(startsAt) > new Date(now.setTime(new Date().getTime() - (30 * 60 * 1000))) && custom?.description?.substring(0, 25) != 'Instant meeting'
    })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}