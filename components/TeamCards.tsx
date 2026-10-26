import ProfileCard from "@/components/ProfileCard";
import TeamGlobe from "@/components/TeamGlobe";
import { TEAM, TEAM_COUNTRIES_TEXT } from "@/lib/site";

// Holo cards for every TEAM member, then the globe of where they work from.
// Shared by the home "Who we are" section and the About page.
export default function TeamCards() {
  return (
    <>
      <ul className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m) => (
          <li key={m.name} className="w-full max-w-[340px]">
            <ProfileCard name={m.name} title={m.role.replace(" & ", "\n")} avatarUrl={m.photo} holo={0.6} className="w-full" />
          </li>
        ))}
      </ul>
      <div className="mt-20 flex flex-col items-center text-center md:mt-28">
        <p className="text-xs tracking-[0.2em] text-white/45 uppercase">One team, three countries</p>
        <p className="mt-4 max-w-xl text-2xl leading-snug tracking-[-0.01em] text-balance md:text-3xl">
          Working from {TEAM_COUNTRIES_TEXT}, with clients worldwide.
        </p>
        <div className="mt-6 w-full md:mt-2">
          <TeamGlobe />
        </div>
      </div>
    </>
  );
}
