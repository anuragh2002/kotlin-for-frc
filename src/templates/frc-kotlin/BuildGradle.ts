export class BuildGradleTemplate {
  private useAtProjectConversion: boolean;
  private text: string;
  constructor() {
    this.useAtProjectConversion = true;
    this.text = `plugins {
    id "java"
    id "edu.wpi.first.GradleRIO" version "#{GRADLE_RIO_VERSION}"
    id "org.jetbrains.kotlin.jvm" version "1.3.0"
}

def ROBOT_MAIN_CLASS = "frc.robot.MainKt"

// Define my targets (RoboRIO) and artifacts (deployable files)
// This is added by GradleRIO's backing project EmbeddedTools.
deploy {
    targets {
        roboRIO("roborio") {
            // Team number is loaded either from the .wpilib/wpilib_preferences.json
            // or from command line. If not found an exception will be thrown.
            // You can use getTeamOrDefault(team) instead of getTeamNumber if you
            // want to store a team number in this file.
            team = frc.getTeamNumber()
        }
    }
    artifacts {
        frcJavaArtifact('frcJava') {
            targets << "roborio"
            // Debug can be overridden by command line, for use with VSCode
            debug = frc.getDebugOrDefault(false)
        }
        // Built in artifact to deploy arbitrary files to the roboRIO.
        fileTreeArtifact('frcStaticFileDeploy') {
            // The directory below is the local directory to deploy
            files = fileTree(dir: 'src/main/deploy')
            // Deploy to RoboRIO target, into /home/lvuser/deploy
            targets << "roborio"
            directory = '/home/lvuser/deploy'
        }
    }
}

// Set this to true to enable desktop support.
def includeDesktopSupport = false

// Maven central needed for JUnit
repositories {
    mavenCentral()
}

// Defining my dependencies. In this case, WPILib (+ friends), and vendor libraries.
// Also defines JUnit 4.
dependencies {
    compile wpi.deps.wpilib()
    compile wpi.deps.vendor.java()
    compile "org.jetbrains.kotlin:kotlin-stdlib"
    nativeZip wpi.deps.vendor.jni(wpi.platforms.roborio)
    nativeDesktopZip wpi.deps.vendor.jni(wpi.platforms.desktop)
    testCompile 'junit:junit:4.12'
}

// Setting up my Jar File. In this case, adding all libraries into the main jar ('fat jar')
// in order to make them all available at runtime. Also adding the manifest so WPILib
// knows where to look for our Robot Class.
jar {
    from { configurations.compile.collect { it.isDirectory() ? it : zipTree(it) } }
    manifest edu.wpi.first.gradlerio.GradleRIOPlugin.javaManifest(ROBOT_MAIN_CLASS)
}
`;
  }
  public getText(): string {
    return this.text;
  }
  public useAtConversion(): boolean {
    return this.useAtProjectConversion;
  }
}