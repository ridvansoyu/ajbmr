from django.contrib import admin
from .models import ReviewRound, Review, ReviewAssignment, ReviewFile, ReviewComment, ReviewRating


@admin.register(ReviewRound)
class ReviewRoundAdmin(admin.ModelAdmin):
    list_display = ("id", "manuscript", "round_number", "started_at")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "manuscript", "review_round", "reviewer", "status", "submitted_at")
    list_filter = ("status",)


@admin.register(ReviewAssignment)
class ReviewAssignmentAdmin(admin.ModelAdmin):
    list_display = ("id", "review_round", "reviewer", "assigned_at", "completed")
    list_filter = ("completed",)


@admin.register(ReviewFile)
class ReviewFileAdmin(admin.ModelAdmin):
    list_display = ("id", "review", "file", "uploaded_at")


@admin.register(ReviewComment)
class ReviewCommentAdmin(admin.ModelAdmin):
    list_display = ("id", "review", "commenter", "created_at")


@admin.register(ReviewRating)
class ReviewRatingAdmin(admin.ModelAdmin):
    list_display = ("id", "review", "criterion", "rating", "created_at")


