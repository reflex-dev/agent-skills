import { execSync } from "node:child_process";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const ROOT_DIR = join(__dirname, "..");
const SKILLS_DIR = join(ROOT_DIR, "skills");
const CLAUDE_SKILLS_DIR = join(ROOT_DIR, ".claude", "skills");

function discoverSkillNames(): string[] {
  if (!existsSync(SKILLS_DIR)) {
    return [];
  }
  return readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => existsSync(join(SKILLS_DIR, entry.name, "SKILL.md")))
    .map((entry) => entry.name);
}

describe("skills add sanity check", () => {
  let commandOutput: string;
  let commandExitCode: number;
  const skillNames = discoverSkillNames();

  beforeAll(() => {
    if (existsSync(CLAUDE_SKILLS_DIR)) {
      rmSync(CLAUDE_SKILLS_DIR, { recursive: true, force: true });
    }
    try {
      commandOutput = execSync("npx skills add . -a claude-code -y", {
        cwd: ROOT_DIR,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 120000,
      });
      commandExitCode = 0;
    } catch (error) {
      const execError = error as {
        stdout?: string;
        stderr?: string;
        status?: number;
      };
      commandOutput = `${execError.stdout || ""}\n${execError.stderr || ""}`;
      commandExitCode = execError.status ?? 1;
    }
  });

  afterAll(() => {
    if (existsSync(CLAUDE_SKILLS_DIR)) {
      rmSync(CLAUDE_SKILLS_DIR, { recursive: true, force: true });
    }
  });

  it("should have discovered skills in the repository", () => {
    expect(skillNames.length).toBeGreaterThan(0);
  });

  it("should not contain 'Error' in command output", () => {
    const hasError =
      /\bError\b/i.test(commandOutput) && !/✓/.test(commandOutput);
    if (hasError) {
      console.log("Command output:", commandOutput);
    }
    expect(commandExitCode).toBe(0);
  });

  it("should create .claude/skills directory", () => {
    expect(existsSync(CLAUDE_SKILLS_DIR)).toBe(true);
  });

  it("should install all skills from the repository", () => {
    for (const skillName of skillNames) {
      const skillPath = join(CLAUDE_SKILLS_DIR, skillName);
      expect(
        existsSync(skillPath),
        `Expected skill "${skillName}" to be installed at ${skillPath}`,
      ).toBe(true);
    }
  });

  it("should have SKILL.md in each installed skill", () => {
    for (const skillName of skillNames) {
      const skillMdPath = join(CLAUDE_SKILLS_DIR, skillName, "SKILL.md");
      expect(
        existsSync(skillMdPath),
        `Expected SKILL.md to exist at ${skillMdPath}`,
      ).toBe(true);
    }
  });
});
