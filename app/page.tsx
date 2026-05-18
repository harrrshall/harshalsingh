import PersonalWebsite from "@/components/personal-website"
import { calculateProgress } from "@/lib/physics"

export default function Home() {
  const physicsProgress = calculateProgress()

  return <PersonalWebsite physicsProgress={physicsProgress} />
}
