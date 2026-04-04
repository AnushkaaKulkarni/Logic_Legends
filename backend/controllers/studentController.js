import InterviewSession from "../models/Interview.js";
import FacultyOralAttempt from "../models/FacultyOralAttempt.js";
import ExamAttempt from "../models/ExamAttempt.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    /* ================= EXAM ATTEMPTS ================= */
    // Fetch all exam attempts that have scores (regardless of status)
    const examAttempts = await ExamAttempt.find({
      student: studentId,
      score: { $exists: true, $ne: null }
    })
      .sort({ submittedAt: -1 }) // Sort by most recent first
      .populate("exam", "title subject");

    const totalQuizzes = examAttempts.length;

    const avgQuizScore =
      totalQuizzes > 0
        ? examAttempts.reduce((sum, a) => sum + (a.score || 0), 0) /
          totalQuizzes
        : 0;

    // Create trend data with most recent attempts first (reverse for chronological display)
    const quizTrend = [...examAttempts].reverse().map((a, i) => ({
      attempt: i + 1,
      score: a.score || 0,
      title: a.exam?.title,
      date: a.submittedAt,
    }));

    /* ================= INTERVIEWS ================= */
    const interviews = await InterviewSession.find({
      student: studentId,
      status: "completed",
    }).sort({ createdAt: -1 });

    const totalInterviews = interviews.length;

    const avgInterviewScore =
      totalInterviews > 0
        ? interviews.reduce((sum, i) => sum + (i.overallScore || 0), 0) /
          totalInterviews
        : 0;

    const interviewTrend = [...interviews].reverse().map((i, index) => ({
      attempt: index + 1,
      score: i.overallScore || 0,
      subject: i.subject,
      date: i.createdAt,
    }));

    /* ================= FACULTY ORALS ================= */
    const facultyOrals = await FacultyOralAttempt.find({
      student: studentId,
      status: "completed",
    }).sort({ createdAt: -1 });

    const totalOrals = facultyOrals.length;

    const avgOralScore =
      totalOrals > 0
        ? facultyOrals.reduce(
            (sum, o) => sum + (o.overallScore || 0),
            0
          ) / totalOrals
        : 0;

    const oralTrend = [...facultyOrals].reverse().map((o, index) => ({
      attempt: index + 1,
      score: o.overallScore || 0,
      date: o.createdAt,
    }));

    /* ================= SUBJECT PERFORMANCE ================= */
    const subjectMap = {};

    examAttempts.forEach((a) => {
      const subject = a.exam?.subject;
      if (!subject) return;

      if (!subjectMap[subject]) subjectMap[subject] = [];
      subjectMap[subject].push(a.score || 0);
    });

    const subjectPerformance = Object.keys(subjectMap).map((sub) => ({
      subject: sub,
      score: Math.round(
        subjectMap[sub].reduce((a, b) => a + b, 0) /
        subjectMap[sub].length
      ),
      attempts: subjectMap[sub].length,
    }));

    /* ================= OVERALL ================= */
    const overallAverage =
      (avgQuizScore + avgInterviewScore + avgOralScore) / 3;

    /* ================= PASS RATE ================= */
    const passedCount = examAttempts.filter(
      (a) => (a.score || 0) >= 40
    ).length;

    const passRate =
      totalQuizzes > 0
        ? Math.round((passedCount / totalQuizzes) * 100)
        : 0;

    /* ================= RECENT ACTIVITY ================= */
    const recentActivity = [
      ...examAttempts.map((a) => ({
        type: "Exam",
        title: a.exam?.title || "Unknown Exam",
        subject: a.exam?.subject || "General",
        score: a.score || 0,
        date: a.submittedAt || a.createdAt,
      })),
      ...interviews.map((i) => ({
        type: "Interview",
        title: i.subject || "Interview",
        subject: i.type || "Technical",
        score: i.overallScore || 0,
        date: i.createdAt,
      })),
      ...facultyOrals.map((o) => ({
        type: "Oral",
        title: "Faculty Oral",
        subject: "Oral Examination",
        score: o.overallScore || 0,
        date: o.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    /* ================= RESPONSE ================= */
    res.json({
      totalQuizzes,
      totalInterviews,
      totalOrals,
      avgQuizScore: Math.round(avgQuizScore),
      avgInterviewScore: Math.round(avgInterviewScore),
      avgOralScore: Math.round(avgOralScore),
      overallAverage: Math.round(overallAverage),
      passRate,
      streak: totalQuizzes, // simple streak logic
      quizTrend,
      interviewTrend,
      oralTrend,
      subjectPerformance,
      recentActivity,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
