enum UserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
}
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}
enum CourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
enum LessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}

enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

enum CouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}

enum RatingStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}


enum CommentStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export {
  CourseLevel,
  CourseStatus,
  LessonType,
  UserRole,
  UserStatus,
  OrderStatus,
  CouponType,
  RatingStatus,
  CommentStatus
};
