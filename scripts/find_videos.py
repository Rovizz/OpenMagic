"""Find YouTube IDs for OpenMagic taxonomy via yt-dlp search."""
import json
import subprocess
import sys

QUERIES = {
    # Tecniche L1
    "mechanics-grip": "52Kards mechanics grip dealers grip tutorial",
    "biddle-grip": "52Kards biddle grip tutorial",
    "straddle-grip": "straddle grip cardistry tutorial",
    "dealing-position": "52Kards dealing cards tutorial",
    "swing-cut": "52Kards swing cut tutorial",
    "swivel-cut": "52Kards swivel cut tutorial",
    "overhand-shuffle": "52Kards overhand shuffle tutorial",
    "hindu-shuffle": "52Kards hindu shuffle tutorial",
    "riffle-shuffle": "52Kards tabled riffle shuffle tutorial",
    "thumb-fan": "52Kards thumb fan tutorial",
    "ribbon-spread": "52Kards ribbon spread tutorial",
    "dribble": "card dribble tutorial 52Kards",
    # Tecniche L2
    "pinky-break": "52Kards pinky break tutorial",
    "thumb-break": "52Kards thumb break tutorial",
    "double-undercut": "52Kards double undercut tutorial",
    "tilt": "52Kards tilt card sleight tutorial",
    "double-lift": "52Kards beginner double lift tutorial",
    "cross-cut-force": "cross cut force card magic tutorial",
    "riffle-force": "52Kards riffle force tutorial",
    "glide": "52Kards glide card sleight tutorial",
    # Tecniche L3
    "classic-pass": "52Kards classic pass tutorial",
    "hermann-pass": "52Kards hermann pass tutorial",
    "jiggle-pass": "52Kards jiggle pass tutorial",
    "side-steal": "side steal card magic tutorial",
    "cull": "52Kards spread cull tutorial",
    "faro-shuffle": "52Kards faro shuffle tutorial",
    "zarrow-shuffle": "zarrow shuffle tutorial card magic",
    "elmsley-count": "52Kards elmsley count tutorial",
    "jordan-count": "jordan count card magic tutorial",
    "pinky-count": "52Kards pinky count tutorial",
    "classic-palm": "52Kards classic palm tutorial",
    "tenkai-palm": "tenkai palm card magic tutorial",
    "gamblers-cop": "52Kards gamblers cop tutorial",
    "top-change": "52Kards top change tutorial",
    "second-deal": "52Kards second deal tutorial",
    "bottom-deal": "52Kards bottom deal tutorial",
    # Trucchi L1
    "21-cards": "21 card trick tutorial mismag822",
    "key-card": "key card trick tutorial beginner",
    "do-as-i-do": "do as i do card trick tutorial gemini",
    # Trucchi L2
    "ambitious-card": "ambitious card routine tutorial 52Kards",
    "chicago-surprise": "chicago surprise red hot mama card trick tutorial",
    "triumph": "dai vernon triumph card trick tutorial",
    "two-card-monte": "two card monte tutorial card magic",
    # Trucchi L3
    "out-of-this-world": "out of this world card trick tutorial paul curry",
    "reset": "reset card trick four aces tutorial",
    "acaan": "ACAAN any card at any number tutorial beginner",
    "card-to-wallet": "signed card to wallet tutorial card magic",
    # Cardistry L1
    "charlier-cut": "charlier cut cardistry tutorial",
    "scissor-cut": "scissor cut cardistry tutorial",
    "revolution-cut": "revolution cut cardistry tutorial 52Kards",
    "spring": "52Kards card spring tutorial",
    # Cardistry L2
    "sybil-cut": "sybil cut tutorial 52Kards",
    "werm": "werm cardistry tutorial",
    "pirouette": "card pirouette flourish tutorial",
    "faro-cascade": "faro cascade cardistry tutorial",
    # Cardistry L3
    "anaconda": "anaconda spring cardistry tutorial",
    "waterwheel": "waterwheel cardistry tutorial",
    "phaced": "phaced squeeze cardistry tutorial",
}

def search(query: str) -> dict | None:
    cmd = [
        sys.executable, "-m", "yt_dlp",
        "--print", "%(id)s|%(title)s|%(channel)s|%(duration)s",
        f"ytsearch1:{query}",
    ]
    try:
        out = subprocess.check_output(cmd, stderr=subprocess.DEVNULL, text=True, timeout=60)
        line = out.strip().split("\n")[0]
        vid, title, channel, duration = line.split("|", 3)
        return {"youtube_id": vid, "title": title, "channel": channel, "duration": duration}
    except Exception as e:
        return {"error": str(e), "query": query}


if __name__ == "__main__":
    results = {}
    for item_id, query in QUERIES.items():
        print(f"Searching: {item_id}...", flush=True)
        results[item_id] = search(query)
    print(json.dumps(results, indent=2, ensure_ascii=False))
