const teamXHighStakesPhoto = '/club/team-x-2025.webp';

export type LegacyProgram = 'FRC' | 'VEX';

export type LegacyMedia = {
  id: string;
  kind: 'photo' | 'video' | 'link' | 'gap';
  title: string;
  caption: string;
  src?: string;
  poster?: string;
  videoId?: string;
  url?: string;
  sourceUrl?: string;
  credit?: string;
};

export type LegacySeason = {
  id: string;
  label: string;
  season: string;
  program: LegacyProgram;
  game: string;
  title: string;
  body: string;
  highlights: string[];
  sourceLinks: { label: string; url: string }[];
  media: LegacyMedia[];
};

export type LegacyAward = {
  id: string;
  program: LegacyProgram;
  team: string;
  season: string;
  game: string;
  award: string;
  event: string;
  eventDate?: string;
  eventEndDate?: string;
  eventUrl: string;
  teamUrl?: string;
  scope?: 'official' | 'off-season';
};

const archiveGap = (id: string, caption: string, sourceUrl: string): LegacyMedia => ({
  id: `${id}-media-gap`,
  kind: 'gap',
  title: 'A place in the archive.',
  caption,
  sourceUrl,
});

const frcSeasons: LegacySeason[] = [
  {
    id: 'frc-2005', label: '2005', season: '2005', program: 'FRC', game: 'Triple Play',
    title: 'A team takes the field.',
    body: 'Cal High Robotics traces its beginnings to students in 2005. FIRST records that same year as Team 1516’s rookie season. At the Silicon Valley Regional, the California Grizzlies earned both Highest Rookie Seed and the Rookie Inspiration Award, and reached the quarterfinals. The school’s FRC chapter was underway.',
    highlights: ['Highest Rookie Seed', 'Rookie Inspiration Award', 'Silicon Valley quarterfinalists'],
    sourceLinks: [
      { label: 'FIRST award record', url: 'https://frc-events.firstinspires.org/2005/SJ/awards' },
      { label: '2005 season archive', url: 'https://www.thebluealliance.com/team/1516/2005' },
    ],
    media: [
      {
        "id": "frc-2005-5DPCFsngw3o",
        "kind": "video",
        "title": "2005 Silicon Valley Regional",
        "caption": "Field footage from Team 1516's Qualification 59 at the 2005 Silicon Valley Regional.",
        "videoId": "5DPCFsngw3o",
        "url": "https://www.youtube.com/watch?v=5DPCFsngw3o",
        "sourceUrl": "https://www.thebluealliance.com/match/2005sj_qm59",
        "credit": "Video: Monta Vista Robotics Team / YouTube"
      }
    ],
  },
  {
    id: 'frc-2006', label: '2006', season: '2006', program: 'FRC', game: 'Aim High',
    title: 'Back to the build.',
    body: 'A new game meant another season of engineering. The Grizzlies returned to the Silicon Valley Regional for Aim High, establishing the rhythm that would carry the program through eight consecutive FRC seasons. In the off-season, 1516 earned the CalGames Kit of Parts Creativity Award and shared the Aim High championship with Teams 968 and 254. The team’s own account describes an improvised garbage-can obstruction after its shooter stopped working.',
    highlights: ['Second FRC season', 'CalGames Kit of Parts Creativity Award', 'CalGames Aim High Champions · off-season'],
    sourceLinks: [
      { label: '2006 season archive', url: 'https://www.thebluealliance.com/team/1516/2006' },
      { label: 'CalGames organizer’s results', url: 'https://www.chiefdelphi.com/t/wrrf-congratulation-to-all-24-cal-games-teams-for-an-incredible-event/74429' },
      { label: 'A contemporary team account', url: 'https://www.chiefdelphi.com/t/team-1516-under-new-management/74483' },
    ],
    media: [archiveGap('frc-2006', 'Competition records and the CalGames organizer’s report preserve this season. A verified photograph or available match recording from this season has not yet been recovered.', 'https://www.thebluealliance.com/team/1516/2006')],
  },
  {
    id: 'frc-2007', label: '2007', season: '2007', program: 'FRC', game: 'Rack ’N’ Roll',
    title: 'Regional champions.',
    body: 'Team 1516 won the Silicon Valley Regional with alliance partners 190 and 1280. Their robot, recorded as Mouse, then traveled to Atlanta for FIRST Championship. The Grizzlies captained an alliance with Teams 364 and 1501 in the Archimedes Division, reaching the division quarterfinals.',
    highlights: ['Silicon Valley Regional Winner', 'FIRST Championship · Archimedes Division', 'Division quarterfinalists'],
    sourceLinks: [
      { label: 'FIRST award record', url: 'https://frc-events.firstinspires.org/2007/SJ/awards' },
      { label: '2007 season archive', url: 'https://www.thebluealliance.com/team/1516/2007' },
    ],
    media: [
      {
        "id": "frc-2007-photo-1",
        "kind": "photo",
        "title": "Team 1516 at the 2007 Silicon Valley Regional",
        "caption": "Team 1516 crosses the Rack 'N' Roll field at the 2007 Silicon Valley Regional.",
        "src": "/club/frc-2007.jpg",
        "sourceUrl": "https://images.nasa.gov/details/ARC-2007-ACD07-0049-023",
        "credit": "NASA / Dominic Hart"
      },
      {
        "id": "frc-2007-5bAeHg5XNO8",
        "kind": "video",
        "title": "2007ARC - QF3M1",
        "caption": "Team 1516 in FIRST Championship — Archimedes Division, quarterfinal match footage (2007).",
        "videoId": "5bAeHg5XNO8",
        "url": "https://www.youtube.com/watch?v=5bAeHg5XNO8",
        "sourceUrl": "https://www.thebluealliance.com/match/2007arc_qf3m1",
        "credit": "Video: Tom Bottiglieri / YouTube"
      },
      {
        "id": "frc-2007-4jr329GOp_4",
        "kind": "video",
        "title": "2007 SVR qm1",
        "caption": "Team 1516 in Silicon Valley Regional, qualification match footage (2007).",
        "videoId": "4jr329GOp_4",
        "url": "https://www.youtube.com/watch?v=4jr329GOp_4",
        "sourceUrl": "https://www.thebluealliance.com/match/2007sj_qm1",
        "credit": "Video: FRC Video Archive / YouTube"
      },
      {
        "id": "frc-2007-photo-4",
        "kind": "photo",
        "title": "2007 Silicon Valley winning alliance",
        "caption": "The 2007 Silicon Valley Regional winning alliance: Teams 1516, 190 and 1280.",
        "src": "https://www.chiefdelphi.com/uploads/default/original/3X/7/d/7d81535a87d2b45c6d090d570079b81fab0b32cc.jpeg",
        "sourceUrl": "https://www.chiefdelphi.com/t/pic-svr-winning-alliance/181521",
        "credit": "Gboehm / Chief Delphi"
      }
    ],
  },
  {
    id: 'frc-2008', label: '2008', season: '2008', program: 'FRC', game: 'FIRST Overdrive',
    title: 'A wider circuit.',
    body: 'The team entered both the Silicon Valley and UC Davis Sacramento regionals, advancing to the Sacramento quarterfinals. A separate CalGames appearance extended competition into the off-season. Those additional matches sit alongside the team’s 14 official FRC events.',
    highlights: ['Sacramento quarterfinalists', 'Two regionals + off-season CalGames'],
    sourceLinks: [{ label: '2008 season archive', url: 'https://www.thebluealliance.com/team/1516/2008' }],
    media: [
      {
        "id": "frc-2008-ZE5uBUY1ipY",
        "kind": "video",
        "title": "2008CAL - QM22",
        "caption": "Team 1516 in Qualification 22 at CalGames 2008, an off-season FIRST Overdrive event.",
        "videoId": "ZE5uBUY1ipY",
        "url": "https://www.youtube.com/watch?v=ZE5uBUY1ipY",
        "sourceUrl": "https://www.thebluealliance.com/match/2008cal_qm22",
        "credit": "Video: Tom Bottiglieri / YouTube"
      },
      {
        "id": "frc-2008-LV6RKshHLnU",
        "kind": "video",
        "title": "2008CG - QM6",
        "caption": "Team 1516 match footage from the 2008 season.",
        "videoId": "LV6RKshHLnU",
        "url": "https://www.youtube.com/watch?v=LV6RKshHLnU",
        "sourceUrl": "https://www.thebluealliance.com/match/2008cal_qm6",
        "credit": "Video: Tom Bottiglieri / YouTube"
      }
    ],
  },
  {
    id: 'frc-2009', label: '2009', season: '2009', program: 'FRC', game: 'LUNACY',
    title: 'Atlanta, again.',
    body: 'After competing at Silicon Valley and Sacramento, the Grizzlies made their second FIRST Championship appearance. In Atlanta’s Newton Division, 1516 placed tenth in qualification rankings and captained an alliance with Teams 1868 and 88. They reached the division quarterfinals, then returned to CalGames later that year.',
    highlights: ['FIRST Championship · Newton Division', 'Division qualification rank 10', 'Division quarterfinalists'],
    sourceLinks: [{ label: '2009 season archive', url: 'https://www.thebluealliance.com/team/1516/2009' }],
    media: [
      {
        "id": "frc-2009-photo-1",
        "kind": "photo",
        "title": "Team 1516's 2009 LUNACY robot",
        "caption": "Team 1516's LUNACY robot in the workshop, shared by the team in March 2009.",
        "src": "https://www.chiefdelphi.com/uploads/default/original/3X/a/a/aa1ae6aaf3d30623d9f1502c16fa0cd6ce21a640.jpeg",
        "sourceUrl": "https://www.chiefdelphi.com/t/pic-1516/96413",
        "credit": "team_1516 / Chief Delphi"
      },
      {
        "id": "frc-2009-FUNh_owF0oM",
        "kind": "video",
        "title": "2009NEW - QM56",
        "caption": "Team 1516 in FIRST Championship — Newton Division, qualification match footage (2009).",
        "videoId": "FUNh_owF0oM",
        "url": "https://www.youtube.com/watch?v=FUNh_owF0oM",
        "sourceUrl": "https://www.thebluealliance.com/match/2009new_qm56",
        "credit": "Video: Tom Bottiglieri / YouTube"
      },
      {
        "id": "frc-2009-photo-3",
        "kind": "photo",
        "title": "2009 robot, side view",
        "caption": "A second workshop view of Team 1516's 2009 LUNACY robot.",
        "src": "https://www.chiefdelphi.com/uploads/default/original/3X/d/8/d8bccba906cc2ad241af55e49a052e7ef1ba9b76.jpeg",
        "sourceUrl": "https://www.chiefdelphi.com/t/pic-1516/176995",
        "credit": "team_1516 / Chief Delphi"
      }
    ],
  },
  {
    id: 'frc-2010', label: '2010', season: '2010', program: 'FRC', game: 'BREAKAWAY',
    title: 'Another step forward.',
    body: 'The BREAKAWAY season brought a quarterfinal appearance at Silicon Valley and a semifinal run at Sacramento with alliance partners 852 and 766. NASA’s photographic archive captures California High School’s Fightin’ Grizzlies competing at the Silicon Valley Regional at San Jose State University that spring.',
    highlights: ['Sacramento semifinalists', 'Silicon Valley quarterfinalists'],
    sourceLinks: [{ label: '2010 season archive', url: 'https://www.thebluealliance.com/team/1516/2010' }],
    media: [
      {
        "id": "frc-2010-photo-1",
        "kind": "photo",
        "title": "The 2010 Fightin' Grizzlies in the pits",
        "caption": "California High School's Team 1516 with its BREAKAWAY robot at the 2010 Silicon Valley Regional.",
        "src": "/club/frc-2010.jpg",
        "sourceUrl": "https://images.nasa.gov/details/ARC-2010-ACD10-0052-039",
        "credit": "NASA"
      },
      {
        "id": "frc-2010-KW9GrLCzDLk",
        "kind": "video",
        "title": "2010SJ - QF3M1",
        "caption": "Team 1516 in Silicon Valley Regional, quarterfinal match footage (2010).",
        "videoId": "KW9GrLCzDLk",
        "url": "https://www.youtube.com/watch?v=KW9GrLCzDLk",
        "sourceUrl": "https://www.thebluealliance.com/match/2010sj_qf3m1",
        "credit": "Video: Tom Bottiglieri / YouTube"
      }
    ],
  },
  {
    id: 'frc-2011', label: '2011', season: '2011', program: 'FRC', game: 'LOGO MOTION',
    title: 'More than one field.',
    body: 'The seventh FRC season took 1516 back to Sacramento and Silicon Valley. Cal High was also participating in the wider robotics community: a January report from Team 254 thanked the school for supplying a VEX competition field. The connection to VEX already existed before the club’s later change in focus.',
    highlights: ['Seventh consecutive FRC season', 'VEX community involvement before the transition'],
    sourceLinks: [
      { label: '2011 season archive', url: 'https://www.thebluealliance.com/team/1516/2011' },
      { label: 'The Bellarmine VEX connection', url: 'https://blog.team254.com/bellarmine-vex-regional/' },
    ],
    media: [
      {
        "id": "frc-2011-photo-1",
        "kind": "photo",
        "title": "Team 1516 at the 2011 Sacramento Regional",
        "caption": "Cal High's Team 1516 beside its LOGO MOTION robot at the Sacramento Regional in Davis, March 2011.",
        "src": "https://live.staticflickr.com/5133/5574862815_41a8e99ed0_b.jpg",
        "sourceUrl": "https://www.flickr.com/photos/bishopwisecarver/5574862815/",
        "credit": "Team 1516 / Stewart Leicester, via Bishop-Wisecarver"
      },
      {
        "id": "frc-2011-yQE6FpZCkRw",
        "kind": "video",
        "title": "2011SAC - QM49",
        "caption": "Team 1516 on the red alliance in Qualification 49 at the 2011 Sacramento Regional.",
        "videoId": "yQE6FpZCkRw",
        "url": "https://www.youtube.com/watch?v=yQE6FpZCkRw",
        "sourceUrl": "https://www.thebluealliance.com/match/2011sac_qm49",
        "credit": "Video: Tom Bottiglieri / YouTube"
      },
      {
        "id": "frc-2011-UeRxWhtSdak",
        "kind": "video",
        "title": "2011SAC - QM9",
        "caption": "Team 1516 in Sacramento Regional, qualification match footage (2011).",
        "videoId": "UeRxWhtSdak",
        "url": "https://www.youtube.com/watch?v=UeRxWhtSdak",
        "sourceUrl": "https://www.thebluealliance.com/match/2011sac_qm9",
        "credit": "Video: Tom Bottiglieri / YouTube"
      }
    ],
  },
  {
    id: 'frc-2012', label: '2012', season: '2012', program: 'FRC', game: 'Rebound Rumble',
    title: 'The next chapter starts.',
    body: 'Team 1516’s final recorded FRC event was the Central Valley Regional in Madera. The Grizzlies finished seventeenth in qualifications and reached the quarterfinals with Teams 295 and 1197. The club dates its shift in focus to VEX to 2012, carrying its school robotics program into a different competition.',
    highlights: ['Central Valley quarterfinalists', 'Final recorded FRC season'],
    sourceLinks: [
      { label: '2012 season archive', url: 'https://www.thebluealliance.com/team/1516/2012' },
      { label: 'The club’s account', url: 'https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx' },
    ],
    media: [
      {
        "id": "frc-2012-photo-1",
        "kind": "photo",
        "title": "Cal High's 2012 Rebound Rumble build",
        "caption": "The Grizzlies' robot chassis and electronics during the February 2012 Rebound Rumble build season.",
        "src": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkjS0UDLl-U5MIiggOJth_q6rdeld3xTY3ci7CZ82KHAF4eC63pOHDeCyhxP4YaoH8xw8thBjxLMB8LnF-TfhCAeIxpRsNpSj3KTfasoyN_cvYfDkSfTtoBbogqHeVanW8fvuKaiLMG6B6/s1600/California-High-School-Updates---February-3.jpg",
        "sourceUrl": "https://bwcnews.blogspot.com/2012/02/first-student-spotlight-aspiring.html",
        "credit": "Bishop-Wisecarver"
      },
      {
        "id": "frc-2012-h4xL05yk854",
        "kind": "video",
        "title": "2012 FRC Central Valley Regional Quarterfinal 3-1",
        "caption": "Team 1516 with Teams 295 and 1197 in Quarterfinal 3, Match 1 at the 2012 Central Valley Regional.",
        "videoId": "h4xL05yk854",
        "url": "https://www.youtube.com/watch?v=h4xL05yk854",
        "sourceUrl": "https://www.thebluealliance.com/match/2012caf_qf3m1",
        "credit": "Video: McKinley Robotics / YouTube"
      },
      {
        "id": "frc-2012-SGUig07hzR4",
        "kind": "video",
        "title": "2012 FRC Central Valley Regional Quarterfinal 3-2",
        "caption": "Team 1516 in Central Valley Regional, quarterfinal match footage (2012).",
        "videoId": "SGUig07hzR4",
        "url": "https://www.youtube.com/watch?v=SGUig07hzR4",
        "sourceUrl": "https://www.thebluealliance.com/match/2012caf_qf3m2",
        "credit": "Video: McKinley Robotics / YouTube"
      }
    ],
  },
];

const vexSeasons: LegacySeason[] = [
  {
    id: 'vex-2012-2013', label: '2012–13', season: '2012-2013', program: 'VEX', game: 'Sack Attack',
    title: 'A new competition chapter.',
    body: 'The club dates its shift in focus from FRC to VEX to 2012. Sack Attack appears in the official season histories for Teams 1516A and 1516B, providing a record of that early VEX chapter. Cal High’s connection to the VEX community was already present in 2011, when the school supplied a field for the Bellarmine regional.',
    highlights: ['Club-reported transition to VEX', '1516A + 1516B season records'],
    sourceLinks: [
      { label: 'The club’s history', url: 'https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx' },
      { label: '1516A official history', url: 'https://events.vex.com/teams/V5RC/1516A' },
      { label: '1516B official history', url: 'https://events.vex.com/teams/V5RC/1516B' },
      { label: 'The 2011 VEX connection', url: 'https://blog.team254.com/bellarmine-vex-regional/' },
    ],
    media: [archiveGap('vex-2012-2013', 'Sack Attack is preserved in the official season records. A verified Cal High photo or recording from 2012–13 has not yet been recovered.', 'https://events.vex.com/teams/V5RC/1516A')],
  },
  {
    id: 'vex-2013-2014', label: '2013–14', season: '2013-2014', program: 'VEX', game: 'Toss Up',
    title: 'Recognition in Tracy.',
    body: 'In the Toss Up season, Team 1516A earned the Judges Award at the Tracy NorCal VEX tournament on February 8, 2014. It is the earliest VEX award in the official team records recovered for this archive; the club’s earlier VEX activity remains part of the story.',
    highlights: ['1516A · Judges Award', 'Tracy NorCal VEX Toss Up Tournament'],
    sourceLinks: [{ label: 'Official event award record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-14-0212.html#awards' }],
    media: [archiveGap('vex-2013-2014', 'The Tracy award has an official record. A verified Cal High photo or recording from the Toss Up season has not yet been recovered.', 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-14-0212.html#awards')],
  },
  {
    id: 'vex-2014-2015', label: '2014–15', season: '2014-2015', program: 'VEX', game: 'Skyrise',
    title: 'Three names in the record.',
    body: 'Skyrise appears in the official season histories for 1516A, 1516B, and 1516C. Those records preserve three team identities within the California High School program. Details of their robots, individual event results, and photographs are still gaps in this archive.',
    highlights: ['1516A, 1516B + 1516C season records', 'Detailed season history still being recovered'],
    sourceLinks: [
      { label: '1516A official history', url: 'https://events.vex.com/teams/V5RC/1516A' },
      { label: '1516B official history', url: 'https://events.vex.com/teams/V5RC/1516B' },
      { label: '1516C official history', url: 'https://events.vex.com/teams/V5RC/1516C' },
    ],
    media: [archiveGap('vex-2014-2015', 'A verified Cal High photo or recording from Skyrise has not yet been recovered. The official team pages retain this season in their histories.', 'https://events.vex.com/teams/V5RC/1516C')],
  },
  {
    id: 'vex-2015-2016', label: '2015–16', season: '2015-2016', program: 'VEX', game: 'Nothing But Net',
    title: 'Inside the robotics classroom.',
    body: 'The official histories for 1516A and 1516B both list Nothing But Net. The club archive preserves photographs of students working on lift mechanisms in February 2016, dated by their original filenames. No award is listed for either team in the reviewed official season records.',
    highlights: ['1516A + 1516B season records', 'Classroom lift builds · February 2016'],
    sourceLinks: [
      { label: '1516A official history', url: 'https://events.vex.com/teams/V5RC/1516A' },
      { label: '1516B official history', url: 'https://events.vex.com/teams/V5RC/1516B' },
    ],
    media: [
      {
        id: 'vex-2015-2016-classroom-lift-build',
        kind: 'photo',
        title: 'Building together in the classroom.',
        caption: 'Cal High Robotics students working on a lift mechanism, February 2, 2016. Date from the original filename.',
        src: '/club/drive-legacy-ancient-2016-build.webp',
        credit: 'Cal High Robotics archive',
      },
      {
        id: 'vex-2015-2016-classroom-scissor-lift',
        kind: 'photo',
        title: 'A classroom scissor lift.',
        caption: 'A Cal High Robotics student beside an extended scissor lift, February 4, 2016. Date from the original filename.',
        src: '/club/drive-legacy-ancient-2016-scissor-lift.webp',
        credit: 'Cal High Robotics archive',
      },
    ],
  },
  {
    id: 'vex-2016-2017', label: '2016–17', season: '2016-2017', program: 'VEX', game: 'Starstruck',
    title: 'Design, recognized.',
    body: 'Team 1516A earned the Design Award at the Northern California Starstruck Tournament on November 19, 2016. The award adds a documented engineering achievement to the club’s VEX history, with the original event record preserving the team, season, and result.',
    highlights: ['1516A · Design Award', 'Northern California Starstruck Tournament'],
    sourceLinks: [{ label: 'Official event award record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-16-1566.html#awards' }],
    media: [
      {
        id: 'vex-2016-2017-team-bleachers-photo',
        kind: 'photo',
        title: 'Team 1516 on the bleachers.',
        caption: 'Cal High Robotics members behind their Team 1516 banner, October 2016 according to the original photo metadata.',
        src: '/club/drive-legacy-2016-17-team.webp',
        credit: 'Cal High Robotics archive',
      },
      {
        "id": "vex-2016-2017-youtube-so1fiJb7QRY",
        "title": "6th Annual Central Valley Starstruck Q40 - 86868 6606A vs 1516B 2059 - 32 to 16",
        "caption": "6th Annual Central Valley Starstruck Q40 - 86868 6606A vs 1516B 2059 - 32 to 16 · 2016-12-10.",
        "sourceUrl": "https://dev.vexdb.io/events/RE-VRC-16-4910?t=results",
        "credit": "Dylon Tjanaka",
        "kind": "video",
        "videoId": "so1fiJb7QRY",
        "url": "https://www.youtube.com/watch?v=so1fiJb7QRY"
      }
    ],
  },
  {
    id: 'vex-2017-2018', label: '2017–18', season: '2017-2018', program: 'VEX', game: 'In the Zone',
    title: 'Team B’s chapter.',
    body: 'During In the Zone, Team 1516B received the Judges Award at the 7th Annual VEX Robotics Tournament on December 2, 2017. The result belongs to B’s own competition history, one of the distinct team stories that together form Cal High Robotics.',
    highlights: ['1516B · Judges Award', '7th Annual VEX Robotics Tournament'],
    sourceLinks: [{ label: 'Official event award record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-17-2858.html#awards' }],
    media: [
      {
        id: 'vex-2017-2018-team-steps-photo',
        kind: 'photo',
        title: 'Team 1516 together on the steps.',
        caption: 'Cal High Robotics members gathered behind their Team 1516 banner, January 2018 according to the original photo metadata.',
        src: '/club/drive-legacy-2017-18-team.webp',
        credit: 'Cal High Robotics archive',
      },
    ],
  },
  {
    id: 'vex-2018-2019', label: '2018–19', season: '2018-2019', program: 'VEX', game: 'Turning Point',
    title: 'The record continues.',
    body: 'Turning Point appears in the official season histories for Teams 1516A and 1516B. The reviewed award records list no awards for either team in this season. Its place in the club’s timeline is preserved here while further event stories and reliably dated media are still being recovered.',
    highlights: ['1516A + 1516B season records', 'More of this season remains to be recovered'],
    sourceLinks: [
      { label: '1516A official history', url: 'https://events.vex.com/teams/V5RC/1516A' },
      { label: '1516B official history', url: 'https://events.vex.com/teams/V5RC/1516B' },
    ],
    media: [archiveGap('vex-2018-2019', 'A Cal High photo or recording securely linked to the Turning Point season has not yet been recovered.', 'https://events.vex.com/teams/V5RC/1516A')],
  },
  {
    id: 'vex-2019-2020', label: '2019–20', season: '2019-2020', program: 'VEX', game: 'Tower Takeover',
    title: 'Building toward state.',
    body: 'Both A and B earned Design Awards during Tower Takeover: 1516A at Central Valley on November 23, 2019, and 1516B at Central Valley on February 8, 2020. The school newspaper followed both teams as they qualified for state competition, before the championship was canceled that March.',
    highlights: ['1516A + 1516B · Design Awards', 'School newspaper documents both teams’ state qualification'],
    sourceLinks: [
      { label: 'The school’s season report', url: 'https://www.thecalifornianpaper.com/2020/03/cal-robotics-teams-qualify-for-state-finals/' },
      { label: '1516A award record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-19-9941.html#awards' },
      { label: '1516B award record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-19-9952.html#awards' },
    ],
    media: [
      {
        "id": "vex-2019-2020-youtube-dK7XeoASxs8",
        "title": "11/23 CV Tower Takeover Q50: 1516B 11551C v 27299X 1669X",
        "caption": "11/23 CV Tower Takeover Q50: 1516B 11551C v 27299X 1669X · 2019-11-23.",
        "sourceUrl": "https://www.youtube.com/watch?v=dK7XeoASxs8",
        "credit": "Milpitas Xtreme Robotics 1669X",
        "kind": "video",
        "videoId": "dK7XeoASxs8",
        "url": "https://www.youtube.com/watch?v=dK7XeoASxs8"
      },
      {
        "id": "vex-2019-2020-youtube-Km0tXKzTECE",
        "title": "VEX tower takeover competition at Ceres High School",
        "caption": "VEX tower takeover competition at Ceres High School. Exact event day unconfirmed.",
        "sourceUrl": "https://www.youtube.com/watch?v=Km0tXKzTECE",
        "credit": "Eli chen",
        "kind": "video",
        "videoId": "Km0tXKzTECE",
        "url": "https://www.youtube.com/watch?v=Km0tXKzTECE"
      },
      {
        "id": "vex-2019-2020-a-tower-takeover-ceres-photo",
        "title": "Tower Takeover, through the school newspaper.",
        "caption": "1516A scores a cube at Ceres, November 23, 2019. View the original photograph and reporting at its source.",
        "sourceUrl": "https://www.thecalifornianpaper.com/2020/03/cal-robotics-teams-qualify-for-state-finals/",
        "credit": "Rahul Deshpande / The Californian",
        "kind": "link",
        "url": "https://www.thecalifornianpaper.com/2020/03/cal-robotics-teams-qualify-for-state-finals/"
      }
    ],
  },
  {
    id: 'vex-2020-2021', label: '2020–21', season: '2020-2021', program: 'VEX', game: 'Change Up',
    title: 'Design through Change Up.',
    body: 'The Change Up season brought another Design Award for 1516A, recorded at the Dublin Robotics Club tournament on February 20, 2021. The official histories also list Change Up for 1516B. Images and a fuller account of the club’s work during this season remain gaps in the archive.',
    highlights: ['1516A · Design Award', 'Dublin Robotics Club Change Up #5'],
    sourceLinks: [
      { label: 'Official event award record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-3717.html#awards' },
      { label: '1516B official history', url: 'https://events.vex.com/teams/V5RC/1516B' },
    ],
    media: [archiveGap('vex-2020-2021', 'The Change Up award is documented. A verified Cal High photo or recording from this season has not yet been recovered.', 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-3717.html#awards')],
  },
  {
    id: 'vex-2021-2022', label: '2021–22', season: '2021-2022', program: 'VEX', game: 'Tipping Point',
    title: 'Two teams, more recognition.',
    body: 'In Tipping Point, 1516A earned the high-school Excellence Award at Central Valley and the Judges Award at the Northern California state championship in Silicon Valley. Team 1516B earned its own high-school Excellence Award at the Pacific Open. Three official awards preserve the two teams’ work across this season.',
    highlights: ['1516A · Excellence + Judges Awards', '1516B · Excellence Award'],
    sourceLinks: [
      {
        "label": "1516A Excellence Award",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-6380.html#awards"
      },
      {
        "label": "1516A state championship award",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-7029.html#awards"
      },
      {
        "label": "1516B Pacific Open award",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-5265.html#awards"
      },
      {
        "label": "Gael Force Battle of the Bay 2022 · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-4966.html"
      }
    ],
    media: [
      {
        "id": "vex-2021-2022-youtube-2Mcgeeeznzo",
        "title": "315W 1669X vs 1516B 5776A | Q17 BotB Vex Tipping Point",
        "caption": "315W 1669X vs 1516B 5776A | Q17 BotB Vex Tipping Point · 2022-01-15.",
        "sourceUrl": "https://www.youtube.com/watch?v=2Mcgeeeznzo",
        "credit": "Milpitas Xtreme Robotics 1669X",
        "kind": "video",
        "videoId": "2Mcgeeeznzo",
        "poster": "https://i.ytimg.com/vi/2Mcgeeeznzo/hqdefault.jpg",
        "url": "https://www.youtube.com/watch?v=2Mcgeeeznzo"
      },
      {
        "id": "vex-2021-2022-a-tipping-point-preparation",
        "title": "Preparing for Tipping Point state competition.",
        "caption": "Cal High's A-team prepares its Tipping Point robot before the March 2022 state competition. View the original photograph and reporting at its source.",
        "sourceUrl": "https://www.thecalifornianpaper.com/2022/03/robotics-a-team-places-5th-at-state/",
        "credit": "Ryan Syms / The Californian",
        "kind": "link",
        "url": "https://www.thecalifornianpaper.com/2022/03/robotics-a-team-places-5th-at-state/"
      }
    ],
  },
  {
    id: 'vex-2022-2023', label: '2022–23', season: '2022-2023', program: 'VEX', game: 'Spin Up',
    title: 'A robot, a team, a Design Award.',
    body: 'Team 1516A earned the Design Award at River Islands VRC Spin Up on February 25, 2023. The club’s archive preserves a photograph of Team A with its robot and a 2022–23 Design Award. Team 1516C also appears in this season’s official event records, adding another part of the school’s competition history.',
    highlights: ['1516A · Design Award', '1516C · River Islands competition record'],
    sourceLinks: [
      { label: 'River Islands official record', url: 'https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-0531.html#awards' },
      { label: 'The club’s archive', url: 'https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx' },
    ],
    media: [
      {
        "id": "vex-2022-2023-a-spin-up-team-photo",
        "title": "1516A during Spin Up.",
        "caption": "1516A with its Spin Up robot and 2022-23 Design Award. Exact capture date unconfirmed.",
        "sourceUrl": "https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx",
        "credit": "Cal High Robotics archive",
        "kind": "photo",
        "src": "/club/team-a-archive.webp"
      },
      {
        id: 'vex-2022-2023-team-trophy-photo',
        kind: 'photo',
        title: 'A team photo from Spin Up.',
        caption: 'Cal High Robotics members with a VEX trophy, from the 2022–23 club photo archive. Exact capture date unconfirmed.',
        src: '/club/drive-legacy-2023-team-trophy.webp',
        credit: 'Cal High Robotics archive',
      }
    ],
  },
  {
    id: 'vex-2023-2024', label: '2023–24', season: '2023-2024', program: 'VEX', game: 'Over Under',
    title: 'Five awards across A and B.',
    body: 'Over Under brought three recorded awards for 1516A: two Design Awards at Central Valley events and Excellence at the Panther tournament. Team 1516B earned Design Awards at Central Valley and River Islands, and published an Over Under robot codebase through the club’s GitHub organization.',
    highlights: ['1516A · 2 Design + 1 Excellence', '1516B · 2 Design Awards', 'Public Over Under code archive'],
    sourceLinks: [
      {
        "label": "1516A official awards",
        "url": "https://events.vex.com/teams/V5RC/1516A"
      },
      {
        "label": "1516B official awards",
        "url": "https://events.vex.com/teams/V5RC/1516B"
      },
      {
        "label": "Club code archive",
        "url": "https://github.com/calhighrobotics"
      },
      {
        "label": "NorCal Silicon Valley VRC Over Under #2 1/28/2024 · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-3512.html"
      }
    ],
    media: [
      {
        id: 'vex-2023-2024-a-outreach-photo',
        kind: 'photo',
        title: 'Team 1516A shares its outreach work.',
        caption: 'Team 1516A with its outreach display, September 2023. The original photo metadata records September 16, 2023.',
        src: '/club/drive-legacy-2023-outreach.webp',
        credit: 'Cal High Robotics archive',
      },
      {
        "id": "vex-2023-2024-club-over-under-wing-prototype",
        "title": "An Over Under wing prototype.",
        "caption": "An early Cal High Over Under drivetrain and wing prototype, documented in the team's engineering wiki. Prototype documentation published retrospectively in September 2024; not a tournament photograph.",
        "sourceUrl": "https://calhighrobotics.github.io/1516x/build_practices/stresses.html",
        "credit": "Cal High Robotics engineering wiki",
        "kind": "photo",
        "src": "https://calhighrobotics.github.io/1516x/build_practices/img/wing.png"
      }
    ],
  },
  {
    id: 'vex-2024-2025', label: '2024–25', season: '2024-2025', program: 'VEX', game: 'High Stakes',
    title: 'Team X takes the field.',
    body: 'High Stakes is Team 1516X’s first season in its published official history. X earned two Design Awards and two Tournament Champions awards, at Central Valley, River Islands, and Saratoga events. Team 1516A added a Design Award and an Inspire Award of its own. The teams’ achievements remain credited to each individual team.',
    highlights: ['1516X · 2 Design + 2 Tournament Champions', '1516A · Design + Inspire Awards'],
    sourceLinks: [
      {
        "label": "1516X official history",
        "url": "https://events.vex.com/teams/V5RC/1516X"
      },
      {
        "label": "1516A official history",
        "url": "https://events.vex.com/teams/V5RC/1516A"
      },
      {
        "label": "Team X High Stakes code",
        "url": "https://github.com/calhighrobotics/high_stakes_x"
      },
      {
        "label": "Central Valley High Stakes VEX V5 #6 · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-6721.html"
      },
      {
        "label": "2025 California Region-2 VEX V5 High School Championship (Season: High Stakes), Day 1 · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-8676.html"
      }
    ],
    media: [
      {
        "id": "vex-2024-2025-x-high-stakes-design-photo",
        "title": "1516X during High Stakes.",
        "caption": "1516X with its High Stakes robot and Design Award, January 2025.",
        "sourceUrl": "https://github.com/calhighrobotics/website/blob/main/src/assets/teamx.jpg",
        "credit": "Cal High Robotics archive",
        "kind": "photo",
        "src": teamXHighStakesPhoto
      }
    ],
  },
  {
    id: 'vex-2025-2026', label: '2025–26', season: '2025-2026', program: 'VEX', game: 'Push Back',
    title: '1516X reaches VEX Worlds.',
    body: 'Team 1516X’s Push Back season included an Innovate Award and three Design Awards. The Design Award at the California Region 2 championship qualified X for the 2026 VEX Robotics World Championship in St. Louis. The school newspaper documented the team’s CAD, testing, notebooks, and collaboration as it prepared for VEX Worlds. Team 1516A also earned a Judges Award during Push Back.',
    highlights: ['1516X · 2026 VEX Robotics World Championship', '1516X · Innovate + 3 Design Awards', '1516A · Judges Award'],
    sourceLinks: [
      {
        "label": "The school’s VEX Worlds story",
        "url": "https://www.thecalifornianpaper.com/2026/05/robotics-builds-up-to-the-world-stage/"
      },
      {
        "label": "World Championship event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-26-4025.html"
      },
      {
        "label": "Region 2 Design Award",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-2460.html#awards"
      },
      {
        "label": "1516A Judges Award",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-1476.html#awards"
      },
      {
        "label": "Second Annual Foothill Robotics Competition: Push Back · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-1514.html"
      },
      {
        "label": "CVCHS Ugly Robotics Pushback Tournament · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-3098.html"
      },
      {
        "label": "DVHS Robotics 15th Annual Robotics Tournament · event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-0148.html"
      }
    ],
    media: [
      {
        "id": "vex-2025-2026-x-worlds-2026-team-photo",
        "title": "1516X at VEX Worlds.",
        "caption": "1516X at the 2026 VEX Robotics World Championship in St. Louis. This photograph belongs to the 2025–26 season.",
        "sourceUrl": "https://github.com/calhighrobotics/website/blob/main/src/components/Teams.tsx",
        "credit": "Cal High Robotics archive",
        "kind": "photo",
        "src": "/club/team-x-2026.webp"
      },
      {
        "id": "vex-2025-2026-x-push-back-cad-session",
        "title": "Inside the team’s Push Back preparation.",
        "caption": "1516X works together on its robot during the Push Back season. View the original photograph and reporting at its source.",
        "sourceUrl": "https://www.thecalifornianpaper.com/2026/05/robotics-builds-up-to-the-world-stage/",
        "credit": "Jinbo Huang / The Californian",
        "kind": "link",
        "url": "https://www.thecalifornianpaper.com/2026/05/robotics-builds-up-to-the-world-stage/"
      },
      {
        "id": "vex-2025-2026-x-regionals-design-fundraiser",
        "title": "The team’s regional Design Award story.",
        "caption": "Grizzly Overdrive celebrates its Design Award during the 2025-26 Push Back season. View the original photograph and reporting at its source.",
        "sourceUrl": "https://www.gofundme.com/f/help-studentrun-cal-high-robotics-team-to-vex-world-champs",
        "credit": "Cal High 1516X Robotics Team fundraiser",
        "kind": "link",
        "url": "https://www.gofundme.com/f/help-studentrun-cal-high-robotics-team-to-vex-world-champs"
      },
      {
        "id": "vex-2025-2026-x-ktvu-worlds-2026",
        "title": "Cal High robotics team gears up for world championship",
        "caption": "KTVU’s March 13, 2026 report follows Cal High’s 1516X as it prepares for the VEX Robotics World Championship.",
        "sourceUrl": "https://www.ktvu.com/video/fmc-ot146dqyn9a4esv0",
        "credit": "KTVU FOX 2",
        "kind": "link",
        "url": "https://www.ktvu.com/video/fmc-ot146dqyn9a4esv0"
      }
    ],
  },
  {
    id: 'vex-2026-2027', label: '2026–27', season: '2026-2027', program: 'VEX', game: 'Override',
    title: 'The next chapter is being built.',
    body: 'Override is the current season. Team 1516X competed at Saratoga VEX V5 Robotics Competition #1 on September 20, 2026, beginning another recorded chapter on the field. Alongside the club’s active A and X teams, incoming Teams Y, Z, and V are preparing to add their own stories. Their incoming status reflects the club’s plans; competitive records have not yet been established here.',
    highlights: ['Current season · Override', '1516X · September 2026 Saratoga competition', '1516Y, 1516Z + 1516V · Incoming'],
    sourceLinks: [
      {
        "label": "September 2026 event record",
        "url": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-26-4987.html"
      },
      {
        "label": "1516A official profile",
        "url": "https://events.vex.com/teams/V5RC/1516A"
      },
      {
        "label": "1516X official profile",
        "url": "https://events.vex.com/teams/V5RC/1516X"
      }
    ],
    media: [
      {
        "id": "vex-2026-2027-media-gap",
        "kind": "gap",
        "title": "A place in the archive.",
        "caption": "Team 1516X competed at Saratoga in September 2026. A photograph or recording segment visibly identifying the team in the Override season has not yet been verified.",
        "sourceUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-26-4987.html"
      }
    ],
  },
];

export const legacySeasons: LegacySeason[] = [...frcSeasons, ...vexSeasons];

const frcAwards: LegacyAward[] = [
  {
    id: 'frc-2005-sj-highest-rookie-seed', program: 'FRC', team: '1516', season: '2005', game: 'Triple Play',
    award: 'Highest Rookie Seed', event: 'Silicon Valley Regional', scope: 'official',
    eventUrl: 'https://frc-events.firstinspires.org/2005/SJ/awards', teamUrl: 'https://frc-events.firstinspires.org/team/1516',
  },
  {
    id: 'frc-2005-sj-rookie-inspiration', program: 'FRC', team: '1516', season: '2005', game: 'Triple Play',
    award: 'Rookie Inspiration Award', event: 'Silicon Valley Regional', scope: 'official',
    eventUrl: 'https://frc-events.firstinspires.org/2005/SJ/awards', teamUrl: 'https://frc-events.firstinspires.org/team/1516',
  },
  {
    id: 'frc-2006-calgames-kit-of-parts', program: 'FRC', team: '1516', season: '2006', game: 'Aim High',
    award: 'Kit of Parts Creativity Award', event: 'California Robot Games (CalGames)', eventDate: '2006-10-28', scope: 'off-season',
    eventUrl: 'https://www.chiefdelphi.com/t/wrrf-congratulation-to-all-24-cal-games-teams-for-an-incredible-event/74429',
    teamUrl: 'https://www.thebluealliance.com/team/1516/2006',
  },
  {
    id: 'frc-2006-calgames-aim-high-champions', program: 'FRC', team: '1516', season: '2006', game: 'Aim High',
    award: 'Aim High Champions', event: 'California Robot Games (CalGames)', eventDate: '2006-10-28', scope: 'off-season',
    eventUrl: 'https://www.chiefdelphi.com/t/wrrf-congratulation-to-all-24-cal-games-teams-for-an-incredible-event/74429',
    teamUrl: 'https://www.thebluealliance.com/team/1516/2006',
  },
  {
    id: 'frc-2007-sj-regional-winner', program: 'FRC', team: '1516', season: '2007', game: 'Rack ’N’ Roll',
    award: 'Regional Winner', event: 'Silicon Valley Regional', scope: 'official',
    eventUrl: 'https://frc-events.firstinspires.org/2007/SJ/awards', teamUrl: 'https://frc-events.firstinspires.org/team/1516',
  },
];

const vexAwards: LegacyAward[] = [
  {
    "id": "vex-1516x-re-v5rc-25-2460-design-award-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2025-2026",
    "game": "Push Back",
    "award": "Design Award",
    "event": "2026 California Region 2 VEX V5 High School Championship: 2025-2026 Season (Push Back), In-Person Judging, Physical Engineering Notebook",
    "eventDate": "2026-03-07",
    "eventEndDate": "2026-03-08",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-2460.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-v5rc-25-1476-judges-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2025-2026",
    "game": "Push Back",
    "award": "Judges Award",
    "event": "Bay Area VEX V5 Push Back Tournament #6",
    "eventDate": "2026-02-21",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-1476.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-25-0148-design-award-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2025-2026",
    "game": "Push Back",
    "award": "Design Award",
    "event": "DVHS Robotics 15th Annual High School Tournament",
    "eventDate": "2026-02-21",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-0148.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-25-3379-design-award-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2025-2026",
    "game": "Push Back",
    "award": "Design Award",
    "event": "RIHS Push Back VEX V5 Robotics Competition: Blended MS & HS",
    "eventDate": "2026-01-10",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-3379.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-25-1514-innovate-award-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2025-2026",
    "game": "Push Back",
    "award": "Innovate Award",
    "event": "Foothill Robotics 2nd Annual Push Back Tournament: Presented by Team 1000",
    "eventDate": "2025-10-11",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-1514.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-25-6884-tournament-champions-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2024-2025",
    "game": "High Stakes",
    "award": "Tournament Champions",
    "event": "Saratoga Robotics Tournament #3: Blended MS&HS, Remote Engineering Notebooks",
    "eventDate": "2025-02-23",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-25-6884.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-24-7784-design-award-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2024-2025",
    "game": "High Stakes",
    "award": "Design Award",
    "event": "RIHS V5RC High Stakes Competition: Blended MS & HS",
    "eventDate": "2025-02-22",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-7784.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-24-7784-tournament-champions-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2024-2025",
    "game": "High Stakes",
    "award": "Tournament Champions",
    "event": "RIHS V5RC High Stakes Competition: Blended MS & HS",
    "eventDate": "2025-02-22",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-7784.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-v5rc-24-6721-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2024-2025",
    "game": "High Stakes",
    "award": "Design Award",
    "event": "Central Valley High Stakes VEX V5 Robotics Competition #6",
    "eventDate": "2025-02-08",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-6721.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-v5rc-24-7783-inspire-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2024-2025",
    "game": "High Stakes",
    "award": "Inspire Award",
    "event": "CVCHS Ugly Robotics High Stakes Tournament #2",
    "eventDate": "2025-01-20",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-7783.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516x-re-v5rc-24-6720-design-award-v5",
    "program": "VEX",
    "team": "1516X",
    "season": "2024-2025",
    "game": "High Stakes",
    "award": "Design Award",
    "event": "Central Valley High Stakes VEX V5 Robotics Competition #5: Blended MS&HS, Remote Engineering Notebooks",
    "eventDate": "2025-01-11",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-V5RC-24-6720.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516X",
    "scope": "official"
  },
  {
    "id": "vex-1516b-re-vrc-23-4169-design-award-v5",
    "program": "VEX",
    "team": "1516B",
    "season": "2023-2024",
    "game": "Over Under",
    "award": "Design Award",
    "event": "River Islands High School VRC Tournament: VRC, Blended MS&HS, In-Person with Physical Notebook Judging",
    "eventDate": "2024-02-24",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-4169.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516B",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-23-4674-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2023-2024",
    "game": "Over Under",
    "award": "Design Award",
    "event": "Central Valley Over and Under Tournament #6",
    "eventDate": "2024-02-10",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-4674.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-23-4883-excellence-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2023-2024",
    "game": "Over Under",
    "award": "Excellence Award",
    "event": "Panther Over Under Roar Tournament",
    "eventDate": "2024-02-03",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-4883.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516b-re-vrc-23-3720-design-award-v5",
    "program": "VEX",
    "team": "1516B",
    "season": "2023-2024",
    "game": "Over Under",
    "award": "Design Award",
    "event": "Central Valley Over and Under Tournament #4: VRC, Blended MS&HS, In-Person with Remote Notebook Judging",
    "eventDate": "2023-12-09",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-3720.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516B",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-23-2208-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2023-2024",
    "game": "Over Under",
    "award": "Design Award",
    "event": "Central Valley Over and Under: Tournament #1",
    "eventDate": "2023-09-16",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-2208.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-23-0531-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2022-2023",
    "game": "Spin Up",
    "award": "Design Award",
    "event": "VRC, River Islands VRC Spin Up, MS&HS, In-Person, with Standard Judging",
    "eventDate": "2023-02-25",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-23-0531.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-21-7029-judges-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2021-2022",
    "game": "Tipping Point",
    "award": "Judges Award",
    "event": "2022 Northern California VRC High School State Championship - SILICON VALLEY",
    "eventDate": "2022-03-05",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-7029.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516b-re-vrc-21-5265-excellence-award-high-school-v5",
    "program": "VEX",
    "team": "1516B",
    "season": "2021-2022",
    "game": "Tipping Point",
    "award": "Excellence Award - High School",
    "event": "VRC, 2nd Annual Pacific Open Tournament, Blended MS&HS, In-Person, with Standard Judging",
    "eventDate": "2022-02-21",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-5265.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516B",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-21-6380-excellence-award-high-school-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2021-2022",
    "game": "Tipping Point",
    "award": "Excellence Award - High School",
    "event": "VRC, Central Valley Vex Robotics Tipping Point Tournament #5, HS&MS, In-person, with Standard Judging",
    "eventDate": "2022-01-29",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-6380.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-21-3717-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2020-2021",
    "game": "Change Up",
    "award": "Design Award",
    "event": "Dublin Robotics Club TOURNAMENT - Change Up #5",
    "eventDate": "2021-02-20",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-21-3717.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516b-re-vrc-19-9952-design-award-v5",
    "program": "VEX",
    "team": "1516B",
    "season": "2019-2020",
    "game": "Tower Takeover",
    "award": "Design Award",
    "event": "Central Valley Tower Takeover",
    "eventDate": "2020-02-08",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-19-9952.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516B",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-19-9941-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2019-2020",
    "game": "Tower Takeover",
    "award": "Design Award",
    "event": "Central Valley Tower Takeover",
    "eventDate": "2019-11-23",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-19-9941.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516b-re-vrc-17-2858-judges-award-v5",
    "program": "VEX",
    "team": "1516B",
    "season": "2017-2018",
    "game": "In the Zone",
    "award": "Judges Award",
    "event": "7th Annual VEX Robotics Tournament (In the Zone)",
    "eventDate": "2017-12-02",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-17-2858.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516B",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-16-1566-design-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2016-2017",
    "game": "Starstruck",
    "award": "Design Award",
    "event": "Northern California Starstruck Tournament",
    "eventDate": "2016-11-19",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-16-1566.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  },
  {
    "id": "vex-1516a-re-vrc-14-0212-judges-award-v5",
    "program": "VEX",
    "team": "1516A",
    "season": "2013-2014",
    "game": "Toss Up",
    "award": "Judges Award",
    "event": "Tracy NorCal VEX Toss Up Tournament",
    "eventDate": "2014-02-08",
    "eventUrl": "https://events.vex.com/robot-competitions/vex-robotics-competition/RE-VRC-14-0212.html#awards",
    "teamUrl": "https://events.vex.com/teams/V5RC/1516A",
    "scope": "official"
  }
];

export const legacyAwards: LegacyAward[] = [...frcAwards, ...vexAwards].sort((a, b) =>
  (a.eventDate ?? a.season).localeCompare(b.eventDate ?? b.season) || a.team.localeCompare(b.team) || a.award.localeCompare(b.award),
);

export const awardCoverage: {
  heading: string;
  notice: string;
  checkedOn: string;
  reviewedTeams: string[];
  notes: string[];
  sources: { label: string; url: string }[];
} = {
  heading: 'Every award we can trace.',
  notice: '31 verified award records: three official FRC awards, two off-season CalGames awards, and 26 VEX awards across Teams 1516A, 1516B, and 1516X. Every available official VEX Awards season for A, B, C, and X was checked on October 15, 2026.',
  checkedOn: '2026-10-15',
  reviewedTeams: ['1516', '1516A', '1516B', '1516C', '1516X'],
  notes: [
    'The VEX review covered 35 team-season entries: 17 for A, 12 for B, three for C, and three for X. Their official records list 13, five, zero, and eight awards respectively.',
    'These are all awards found in the reviewed records. Historical records may omit recognition, and the family search could not establish an exhaustive registry of every past Cal High team.',
    'No results in an available Awards season means no awards are listed there. Missing seasons, unrecorded achievements, and future results are not assigned a zero.',
    'The two 2006 CalGames awards are marked off-season and are separate from FIRST’s three official awards. CalGames champions 1516, 968, and 254 shared the title.',
    'Event dates describe the competition dates. The 2026 Region 2 championship ran March 7–8; its award ceremony was not separately timestamped.',
    'Each award remains attributed to its recipient team. An alliance title shared by different teams is not collapsed into a single recipient record.',
    'Incoming Teams Y, Z, and V are club plans and do not yet have verified competition awards in this archive.',
  ],
  sources: [
    { label: 'FIRST Team 1516 history', url: 'https://frc-events.firstinspires.org/team/1516' },
    { label: '2006 CalGames organizer’s results', url: 'https://www.chiefdelphi.com/t/wrrf-congratulation-to-all-24-cal-games-teams-for-an-incredible-event/74429' },
    { label: 'VEX 1516A official awards', url: 'https://events.vex.com/teams/V5RC/1516A' },
    { label: 'VEX 1516B official awards', url: 'https://events.vex.com/teams/V5RC/1516B' },
    { label: 'VEX 1516C official awards', url: 'https://events.vex.com/teams/V5RC/1516C' },
    { label: 'VEX 1516X official awards', url: 'https://events.vex.com/teams/V5RC/1516X' },
  ],
};
