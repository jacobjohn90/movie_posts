class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    can :read, Comment

    can [:destroy], Comment do |comment|
      comment.user == user
    end
    can [:create], Comment do |comment|
      comment.user == user
    end
    can [:update], Comment do |comment|
      comment.user == user
    end
  end
end
