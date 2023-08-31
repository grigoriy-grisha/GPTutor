package com.chatgpt.entity;

public class LeetCodeProblem {
    public LeetCodeProblemStat getStat() {
        return stat;
    }

    public void setStat(LeetCodeProblemStat stat) {
        this.stat = stat;
    }

    public LeetCodeProblemDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(LeetCodeProblemDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public boolean isPaid_only() {
        return paid_only;
    }

    public void setPaid_only(boolean paid_only) {
        this.paid_only = paid_only;
    }

    public boolean isIs_favor() {
        return is_favor;
    }

    public void setIs_favor(boolean is_favor) {
        this.is_favor = is_favor;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public static class LeetCodeProblemStat {
        int question_id;
        boolean question__article__live;
        String question__article__slug;
        boolean question__article__has_video_solution;
        String question__title;
        String question__title_slug;

        boolean question__hide;
        int total_acs;
        int total_submitted;
        int frontend_question_id;
        boolean is_new_question;

        public int getQuestion_id() {
            return question_id;
        }

        public void setQuestion_id(int question_id) {
            this.question_id = question_id;
        }

        public boolean isQuestion__article__live() {
            return question__article__live;
        }

        public void setQuestion__article__live(boolean question__article__live) {
            this.question__article__live = question__article__live;
        }

        public String getQuestion__article__slug() {
            return question__article__slug;
        }

        public void setQuestion__article__slug(String question__article__slug) {
            this.question__article__slug = question__article__slug;
        }

        public boolean isQuestion__article__has_video_solution() {
            return question__article__has_video_solution;
        }

        public void setQuestion__article__has_video_solution(boolean question__article__has_video_solution) {
            this.question__article__has_video_solution = question__article__has_video_solution;
        }

        public String getQuestion__title() {
            return question__title;
        }

        public void setQuestion__title(String question__title) {
            this.question__title = question__title;
        }

        public String getQuestion__title_slug() {
            return question__title_slug;
        }

        public void setQuestion__title_slug(String question__title_slug) {
            this.question__title_slug = question__title_slug;
        }

        public boolean isQuestion__hide() {
            return question__hide;
        }

        public void setQuestion__hide(boolean question__hide) {
            this.question__hide = question__hide;
        }

        public int getTotal_acs() {
            return total_acs;
        }

        public void setTotal_acs(int total_acs) {
            this.total_acs = total_acs;
        }

        public int getTotal_submitted() {
            return total_submitted;
        }

        public void setTotal_submitted(int total_submitted) {
            this.total_submitted = total_submitted;
        }

        public int getFrontend_question_id() {
            return frontend_question_id;
        }

        public void setFrontend_question_id(int frontend_question_id) {
            this.frontend_question_id = frontend_question_id;
        }

        public boolean isIs_new_question() {
            return is_new_question;
        }

        public void setIs_new_question(boolean is_new_question) {
            this.is_new_question = is_new_question;
        }
    }

    public static class LeetCodeProblemDifficulty {
        int level;

        public int getLevel() {
            return level;
        }

        public void setLevel(int level) {
            this.level = level;
        }
    }


    String status;

    LeetCodeProblemStat stat;
    LeetCodeProblemDifficulty difficulty;
    boolean paid_only;
    boolean is_favor;
    int frequency;
    int progress;
}
