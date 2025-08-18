from django.contrib import admin
from .models import Journal, Section


@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug", "is_active")
    search_fields = ("name", "slug")


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "journal", "name", "slug")
    search_fields = ("name", "slug")


