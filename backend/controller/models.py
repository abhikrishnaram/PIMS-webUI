from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string


class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    api_key = models.CharField(max_length=64, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.api_key:
            self.api_key = get_random_string(64)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Valve(models.Model):
    name = models.CharField(max_length=100)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='valves')
    status = models.CharField(max_length=20, choices=[('on', 'On'), ('off', 'Off'), ('fault', 'Fault')])
    last_updated = models.DateTimeField(auto_now=True)
    controller = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.group.name})"
    
    def is_open(self):
        return self.status == 'on'
    
    def set_open(self):
        self.status = 'on'
        self.save()

    def set_close(self):
        self.status = 'off'
        self.save()

    def set_fault(self):
        self.status = 'fault'
        self.save()


class Task(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='tasks')
    valve = models.ForeignKey(Valve, on_delete=models.CASCADE)
    action = models.CharField(max_length=20, choices=[('on', 'Turn On'), ('off', 'Turn Off')])
    order = models.PositiveIntegerField()
    duration = models.PositiveIntegerField(help_text="Duration in seconds", null=True, blank=True)

    def __str__(self):
        return f"Task {self.id} for {self.group.name}"


class Log(models.Model):
    valve = models.ForeignKey(Valve, on_delete=models.CASCADE, related_name='logs')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='logs')
    timestamp = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=50)
    message = models.TextField()

    def __str__(self):
        return f"Log {self.id} for {self.group.name}"
